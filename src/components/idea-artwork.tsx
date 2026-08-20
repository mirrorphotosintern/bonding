import { useState } from "react";
import { StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { colors, borderRadius } from "../theme";
import { getGameArtworkIndex } from "../data/game-artwork-manifest";

type Props = {
  id: string;
  title: string;
  compact?: boolean;
};

const artById: Record<
  string,
  { background: string; foreground: string; symbol: string; mark: string }
> = {
  talk_would_you_rather: {
    background: colors.sun,
    foreground: colors.text,
    symbol: "arrow.left.arrow.right",
    mark: "OR?",
  },
  talk_i_spy: {
    background: colors.mint,
    foreground: colors.text,
    symbol: "eye.fill",
    mark: "I SPY",
  },
  talk_twenty_questions: {
    background: colors.lavender,
    foreground: colors.text,
    symbol: "questionmark.bubble.fill",
    mark: "20?",
  },
  talk_fortunately: {
    background: colors.coral,
    foreground: "#FFFDF7",
    symbol: "cloud.sun.fill",
    mark: "THEN…",
  },
  talk_picnic: {
    background: colors.sun,
    foreground: colors.text,
    symbol: "basket.fill",
    mark: "+ ONE",
  },
  talk_sound_chain: {
    background: colors.cobalt,
    foreground: "#FFFDF7",
    symbol: "waveform",
    mark: "COPY",
  },
  act_shadow_doubles: {
    background: colors.lavender,
    foreground: colors.text,
    symbol: "sun.max.fill",
    mark: "TRACE",
  },
  act_sock_knockdown: {
    background: colors.coral,
    foreground: "#FFFDF7",
    symbol: "circle.grid.3x3.fill",
    mark: "AIM!",
  },
  act_mirror_hands: {
    background: colors.mint,
    foreground: colors.text,
    symbol: "hand.raised.fill",
    mark: "MIRROR",
  },
  act_reverse_forks: {
    background: colors.cobalt,
    foreground: "#FFFDF7",
    symbol: "arrow.trianglehead.2.clockwise.rotate.90",
    mark: "1 MOVE",
  },
  act_laundry_match: {
    background: colors.sun,
    foreground: colors.text,
    symbol: "tshirt.fill",
    mark: "MATCH",
  },
  act_adjective_faces: {
    background: colors.lavender,
    foreground: colors.text,
    symbol: "face.smiling.fill",
    mark: "SHOW IT",
  },
};

const kannadaArtworkById: Readonly<Record<string, number>> = {
  kn_aane_bantond_aane: require("../../assets/game-art/kannada/aane-bantond-aane.webp"),
  kn_avalakki_pavalakki: require("../../assets/game-art/kannada/avalakki-pavalakki.webp"),
  kn_hebberalanna: require("../../assets/game-art/kannada/hebberalanna.webp"),
  kn_oota_yaarige: require("../../assets/game-art/kannada/oota-yaarige.webp"),
};

export function IdeaArtwork({ id, title, compact = false }: Props) {
  const kannadaArtwork = kannadaArtworkById[id];

  if (kannadaArtwork) {
    return (
      <Image
        source={kannadaArtwork}
        contentFit="cover"
        accessible
        accessibilityLabel={`Illustration showing how to play ${title}`}
        style={[styles.kannadaArtwork, compact && styles.kannadaArtworkCompact]}
      />
    );
  }

  const artworkIndex = getGameArtworkIndex(id);

  if (artworkIndex !== undefined) {
    return (
      <GeneratedIdeaArtwork
        index={artworkIndex}
        title={title}
        compact={compact}
      />
    );
  }

  const art = artById[id] || {
    background: colors.sun,
    foreground: colors.text,
    symbol: "sparkles",
    mark: "TRY IT",
  };

  return (
    <View
      accessible
      accessibilityLabel={`Illustration for ${title}`}
      style={[
        styles.stage,
        compact && styles.stageCompact,
        { backgroundColor: art.background },
      ]}
    >
      <View style={[styles.dot, styles.dotOne]} />
      <View style={[styles.dot, styles.dotTwo]} />
      <View
        style={[
          styles.symbolTile,
          compact && styles.symbolTileCompact,
          { transform: [{ rotate: "-7deg" }] },
        ]}
      >
        <SymbolView
          name={art.symbol as never}
          style={compact ? styles.symbolCompact : styles.symbol}
          tintColor={art.foreground}
        />
      </View>
      <View
        style={[
          styles.wordTile,
          compact && styles.wordTileCompact,
          { transform: [{ rotate: "6deg" }] },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            compact ? styles.markCompact : styles.mark,
            { color: art.foreground },
          ]}
        >
          {art.mark}
        </Text>
      </View>
    </View>
  );
}

const artworkSheets = [
  require("../../assets/game-art/original-games-01.webp"),
  require("../../assets/game-art/original-games-02.webp"),
  require("../../assets/game-art/original-games-03.webp"),
] as const;

function GeneratedIdeaArtwork({
  index,
  title,
  compact,
}: {
  index: number;
  title: string;
  compact: boolean;
}) {
  const [size, setSize] = useState(0);
  const sheet = Math.floor(index / 36);
  const cell = index % 36;
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  function captureSize(event: LayoutChangeEvent) {
    const nextSize = event.nativeEvent.layout.width;
    if (nextSize !== size) setSize(nextSize);
  }

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Illustration showing how to play ${title}`}
      onLayout={captureSize}
      style={[styles.generatedStage, compact && styles.generatedStageCompact]}
    >
      {size > 0 && (
        <Image
          source={artworkSheets[sheet]}
          contentFit="fill"
          cachePolicy="memory-disk"
          recyclingKey={title}
          style={[
            styles.spriteSheet,
            {
              width: size * 6,
              height: size * 6,
              transform: [
                { translateX: -column * size },
                { translateY: -row * size },
              ],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kannadaArtwork: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: colors.surfaceWarm,
  },
  kannadaArtworkCompact: {
    height: 104,
    aspectRatio: undefined,
    borderRadius: borderRadius.md,
  },
  generatedStage: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  generatedStageCompact: {
    height: 104,
    aspectRatio: undefined,
    borderRadius: borderRadius.md,
  },
  spriteSheet: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  stage: {
    height: 224,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  stageCompact: { height: 104, borderRadius: borderRadius.md },
  dot: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(24,34,59,0.14)",
  },
  dotOne: { left: 26, top: 24 },
  dotTwo: { right: 30, bottom: 24, width: 11, height: 11, borderRadius: 6 },
  symbolTile: {
    width: 112,
    height: 124,
    marginLeft: -78,
    borderRadius: borderRadius.lg,
    backgroundColor: "rgba(255,253,247,0.92)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.text,
  },
  symbolTileCompact: {
    width: 58,
    height: 66,
    marginLeft: -42,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
  },
  symbol: { width: 58, height: 58 },
  symbolCompact: { width: 30, height: 30 },
  wordTile: {
    position: "absolute",
    width: 126,
    height: 86,
    right: 40,
    bottom: 34,
    borderRadius: borderRadius.md,
    backgroundColor: "rgba(255,253,247,0.95)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.text,
  },
  wordTileCompact: {
    width: 70,
    height: 44,
    right: 18,
    bottom: 16,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  mark: { fontSize: 22, fontWeight: "900", letterSpacing: -0.4 },
  markCompact: { fontSize: 11, fontWeight: "900", letterSpacing: 0.1 },
});
