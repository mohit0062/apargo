"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault()
      if (props.disabled) return
      if (onCheckedChange) {
        onCheckedChange(!checked)
      }
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={props.disabled}
        onClick={handleToggle}
        className={cn(
          "peer inline-flex h-5.5 w-9.5 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-muted-foreground/30",
          className
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-4.5 w-4.5 rounded-full bg-background shadow-md ring-0 transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="sr-only"
          readOnly
          {...props}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
