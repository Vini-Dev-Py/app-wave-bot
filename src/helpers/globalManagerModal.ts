import { RefObject } from "react";

class GlobalManagerModal {
  private static instance: GlobalManagerModal;
  private currentZIndex: number;
  private modalStack: RefObject<HTMLDivElement>[]

  private constructor(initialZIndex: number = 1000) {
    this.currentZIndex = initialZIndex;
    this.modalStack = []
  }

  public static getInstance(initialZIndex?: number): GlobalManagerModal {
    if (!GlobalManagerModal.instance) {
      GlobalManagerModal.instance = new GlobalManagerModal(initialZIndex);
    }
    return GlobalManagerModal.instance;
  }

  public getZIndex(): number {
    ++this.currentZIndex;
    return this.currentZIndex;
  }

  public decrementZIndex(): number {
    if (this.currentZIndex > 0) {
      return --this.currentZIndex;
    }
    throw new Error("O valor de zIndex não pode ser menor que zero.");
  }

  public resetZIndex(newZIndex: number): void {
    if (newZIndex < 0) {
      throw new Error("O valor de zIndex não pode ser negativo.");
    }
    this.currentZIndex = newZIndex;
  }

  public pushModal(modal: RefObject<HTMLDivElement>): void {
    this.modalStack.push(modal)
  }

  public popModal(): void {
    this.modalStack.pop()
  }

  public getTopModal(): RefObject<HTMLDivElement> | null {
    return this.modalStack.length > 0 ? this.modalStack[this.modalStack.length - 1] : null;
  }
}

export const globalManagerModal = GlobalManagerModal.getInstance(2000)