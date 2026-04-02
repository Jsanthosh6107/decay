import * as React from "react"
import { cn } from "@/lib/utils"

type WithClassName<T> = T & { className?: string }

export function H1({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center font-extrabold tracking-tight text-balance text-shadow-(--text-shadow-ars-green)",
        className
      )}
      {...props}
    />
  )
}

export function H2({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-3 mb-4 text-6xl font-semibold tracking-tight first:mt-0 uppercase text-shadow-ars-green relative",
        "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white",
        className
      )}
      {...props}
    />
  )
}

export function H3({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3
      className={cn("scroll-m-20 text-3xl font-bold tracking-tight text-shadow-ars", className)}
      {...props}
    />
  )
}

export function H4({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h4
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function P({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p
      className={cn("text-xl leading-7 not-first:mt-6 text-shadow-2xs font-normal", className)}
      {...props}
    />
  )
}

export function TypographyBlockquote({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLQuoteElement>>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  )
}

export function TypographyTable({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("my-6 w-full overflow-y-auto", className)}
      {...props}
    />
  )
}

export function TypographyList({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLUListElement>>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  )
}

export function TypographyLead({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cn("text-muted-foreground text-xl font-semibold", className)} {...props} />
  )
}

export function TypographyLarge({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />
}

export function TypographySmall({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLElement>>) {
  return <small className={cn("text-sm leading-none font-medium", className)} {...props} />
}

export function TypographyMuted({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />
}

export function Highlight({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLSpanElement>>) {
  return <span className={cn("text-ars-highlight text-shadow-yellow-shadow", className)} {...props} />
}

export function CounterButtonIncrease({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "flex text-white w-1/2 justify-center gap-2 text-xl border-[.15rem] border-ars-accent rounded-xl bg-[color-mix(in_srgb,var(--color-ars-accent)_50%,transparent)] p-[.65rem] items-center",
        className
      )}
      {...props}
    />
  )
}

export const Typography = {
  H1: H1, 
  H2: H2,
  H3: H3,
  H4: H4,
  P: P,
  Blockquote: TypographyBlockquote,
  Table: TypographyTable,
  List: TypographyList,
  Lead: TypographyLead,
  Large: TypographyLarge,
  Small: TypographySmall,
  Muted: TypographyMuted,
  Highlight: Highlight,
  CounterButtonIncrease: CounterButtonIncrease
} as const