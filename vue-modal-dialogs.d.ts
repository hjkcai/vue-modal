import Vue, { Component, ComponentOptions, VNodeData } from 'vue'
export as namespace VueModalDialogs

export interface PluginOptions {
  /**
   * Mount point of the wrapper element. All dialogs will be inside this wrapper.
   * vue-modal-dialogs automatically creates a new element if that element is not present.
   *
   * Defaults to `undefined`.
   */
  el?: HTMLElement | string,

  /**
   * Render options of the wrapper element.
   *
   * This options is the same to VNode's render option.
   * You can pass any props/events supported by the <transition-group> component.
   * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
   */
  wrapper?: VNodeData

  /**
   * Component options of the dialog wrapper component.
   */
  wrapperComponentOptions?: ComponentOptions<Vue>

  /**
   * Options to control the `z-index` css property of each dialog.
   * This feature guarantees that the newer dialog is always on the top of the older dialogs.
   * You can disable this feature by setting this option to `false`.
   */
  zIndex?: {
    /**
     * The initial value of `z-index`.
     *
     * Defaults to `1000`.
     */
    value?: number,

    /**
     * Indicates if the `z-index` auto increases
     * when a new modal dialog is shown.
     *
     * Defaults to `true`.
     */
    autoIncrement?: boolean
  } | false
}

/** A Vue component that registered as a dialog */
export class DialogComponent<T> extends Vue {
  /** The unique id of this dialog */
  readonly dialogId: number

  /** The arguments array passed into the dialog function */
  readonly arguments: any[]

  /** Close dialog */
  $close (data: T): void
}

export interface DialogPromise<T> extends Promise<T> {
  close (data: T): DialogPromise<T>
}

/** Options to build a dialog function */
export interface DialogOptions<T> {
  /** A Vue component that will be the 'dialog component' */
  component: DialogComponent<T>,

  /** An array that maps the argument list to props */
  props: string[],

  /**
   * Options to render the dialog component.
   *
   * This is the same to the VNode's render options.
   * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
   */
  render?: VNodeData
}

export interface DialogFunction<T> {
  (...args: any[]): DialogPromise<T>
}

export interface ModalDialogsInstance {
  /** Install `vue-modal-dialogs` into Vue */
  install (vue: typeof Vue, options?: PluginOptions): void,

  /** Create a dialog function */
  makeDialog<T> (component: Component, ...props: string[]): DialogFunction<T>,

  /** Create a dialog function */
  makeDialog<T> (options: DialogOptions<T>): DialogFunction<T>
}

declare const modalDialogs: ModalDialogsInstance
export default modalDialogs

/** Create a dialog function */
export function makeDialog<T> (component: Component, ...props: string[]): DialogFunction<T>

/** Create a dialog function */
export function makeDialog<T> (options: DialogOptions<T>): DialogFunction<T>
