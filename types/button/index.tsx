export type BtnType = {
  title: string;
  onClick?: () => void;
  loading: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};
