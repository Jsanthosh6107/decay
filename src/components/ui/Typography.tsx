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
        "scroll-m-20 text-center font-extrabold tracking-tight text-balance",
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
        "scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0 uppercase",
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
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight italic", className)}
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
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
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
      className={cn("leading-7 not-first:mt-6", className)}
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
    <p className={cn("text-muted-foreground text-xl", className)} {...props} />
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

/**
 * Optional: convenient namespace-style export
 * usage: import { Typography } from "@/components/ui/typography"
 * then: <Typography.H1>Title</Typography.H1>
 */
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
} as const