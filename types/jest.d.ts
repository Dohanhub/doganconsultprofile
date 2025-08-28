/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveValue(value: string | string[] | number): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toBeRequired(): R
      toBeInvalid(): R
      toBeValid(): R
      toHaveAccessibleName(name: string | RegExp): R
      toHaveAccessibleDescription(description: string | RegExp): R
      toHaveErrorMessage(text: string | RegExp): R
      toContain(value: any): R
      toBeDefined(): R
      toBeInstanceOf(constructor: any): R
      toBe(value: any): R
      toEqual(value: any): R
      toHaveLength(length: number): R
      toHaveProperty(key: string, value?: any): R
      toMatch(regexp: RegExp | string): R
      toThrow(error?: string | RegExp | Error): R
      toHaveBeenCalled(): R
      toHaveBeenCalledTimes(times: number): R
      toHaveBeenCalledWith(...args: any[]): R
      toHaveBeenLastCalledWith(...args: any[]): R
      toHaveBeenNthCalledWith(n: number, ...args: any[]): R
      toHaveReturned(): R
      toHaveReturnedTimes(times: number): R
      toHaveReturnedWith(value: any): R
      toHaveLastReturnedWith(value: any): R
      toHaveNthReturnedWith(n: number, value: any): R
    }
  }
}

export {}
