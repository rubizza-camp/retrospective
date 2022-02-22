type EmojiColumnNameType =
  | "firstColumnEmoji"
  | "secondColumnEmoji"
  | "thirdColumnEmoji";

type ColumnEmoji = {
  emoji: string;
};

export type EmojiDataStateType = {
  emojiColumnName: string;
  emojiPickerOpen: boolean;
};

export type EmojiIconProps = {
  emojiColumnName: EmojiColumnNameType;
  setEmojiData: ({}: EmojiDataStateType) => void;
  formData: {
    boardName: string | number;
    firstColumnName: string;
    secondColumnName: string;
    thirdColumnName: string;
    firstColumnEmoji: ColumnEmoji;
    secondColumnEmoji: ColumnEmoji;
    thirdColumnEmoji: ColumnEmoji;
  };
};
