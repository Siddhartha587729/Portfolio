import React from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
}

export function Heading({ as = 'h2', children, className = '', ...props }: HeadingProps) {
  const Component = as
  const baseClasses = {
    h1: 'text-5xl font-bold tracking-tight',
    h2: 'text-4xl font-bold tracking-tight',
    h3: 'text-3xl font-bold tracking-tight',
    h4: 'text-2xl font-semibold',
    h5: 'text-xl font-semibold',
    h6: 'text-lg font-semibold',
  }

  return (
    <Component className={`${baseClasses[as]} text-slate-900 ${className}`} {...props}>
      {children}
    </Component>
  )
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'base' | 'sm' | 'lg'
  children: React.ReactNode
}

export function Paragraph({ variant = 'base', children, className = '', ...props }: ParagraphProps) {
  const baseClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  }

  return (
    <p className={`${baseClasses[variant]} text-slate-600 ${className}`} {...props}>
      {children}
    </p>
  )
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  children: React.ReactNode
}

export function Badge({ variant = 'default', children, className = '', ...props }: BadgeProps) {
  const baseClasses = {
    default: 'bg-slate-100 text-slate-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${baseClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
