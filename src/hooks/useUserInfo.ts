import { create } from "zustand";

type State = {
  name: string;
  age: number;
  clothes: {
    size: "l" | "m" | "s";
    color: "blue" | "red";
  };
};

type Actions = {
  setName: (name: State["name"]) => void;
  setAge: (age: State["age"]) => void;
  setClothesColor: (color: State["clothes"]["color"]) => void;
};

export const useUserInfo = create<State & Actions>((set) => ({
  name: "",
  age: 0,
  clothes: {
    size: "l",
    color: "blue",
  },
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setClothesColor: (color) =>
    set((state) => ({ clothes: { ...state.clothes, color } })),
}));
