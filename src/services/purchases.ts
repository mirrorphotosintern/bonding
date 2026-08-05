import Constants from "expo-constants";
import { Platform } from "react-native";
import Purchases, {
  type CustomerInfo,
  type PurchasesPackage,
} from "react-native-purchases";

export const LIFETIME_ENTITLEMENT_ID = "try_this_full_access";
export const LIFETIME_PRICE_FALLBACK = "$19.99";

const IOS_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? "";
const ANDROID_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY ?? "";
const isExpoGo = Constants.appOwnership === "expo";
let configured = false;

function platformKey(): string {
  if (Platform.OS === "ios") return IOS_KEY;
  if (Platform.OS === "android") return ANDROID_KEY;
  return "";
}

export function configurePurchases(): boolean {
  if (configured) return true;
  const key = platformKey();
  if (isExpoGo || !key || key.includes("replace_me")) return false;

  try {
    Purchases.configure({ apiKey: key });
    configured = true;
    return true;
  } catch (error) {
    console.warn("[Purchases] Could not configure RevenueCat", error);
    return false;
  }
}

function hasLifetimeAccess(info: CustomerInfo): boolean {
  return info.entitlements.active[LIFETIME_ENTITLEMENT_ID]?.isActive === true;
}

export async function getLifetimeStatus(): Promise<{
  unlocked: boolean;
  price: string;
}> {
  if (!configurePurchases()) {
    return { unlocked: false, price: LIFETIME_PRICE_FALLBACK };
  }

  const [info, offerings] = await Promise.all([
    Purchases.getCustomerInfo(),
    Purchases.getOfferings(),
  ]);
  const lifetime = findLifetimePackage(offerings.current?.availablePackages ?? []);
  return {
    unlocked: hasLifetimeAccess(info),
    price: lifetime?.product.priceString ?? LIFETIME_PRICE_FALLBACK,
  };
}

function findLifetimePackage(packages: PurchasesPackage[]): PurchasesPackage | null {
  return (
    packages.find((item) => item.packageType === "LIFETIME") ??
    packages.find((item) => /lifetime|full.?access|unlock/i.test(item.identifier)) ??
    null
  );
}

export async function purchaseLifetime(): Promise<boolean> {
  if (!configurePurchases()) {
    throw new Error("Purchases are not available in this preview build.");
  }

  const offerings = await Purchases.getOfferings();
  const lifetime = findLifetimePackage(offerings.current?.availablePackages ?? []);
  if (!lifetime) {
    throw new Error("The lifetime unlock is not available from the store yet.");
  }

  const result = await Purchases.purchasePackage(lifetime);
  return hasLifetimeAccess(result.customerInfo);
}

export async function restoreLifetime(): Promise<boolean> {
  if (!configurePurchases()) {
    throw new Error("Restore is not available in this preview build.");
  }
  return hasLifetimeAccess(await Purchases.restorePurchases());
}
