import { ComponentProps, forwardRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<"button"> & {
	variant?: 'filled' | 'outlined' | 'text'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({variant = 'filled', children, className, disabled, ...rest }: ButtonProps, ref) => {
	
	const variantClass = useMemo(() => {
		switch (variant) {
			case 'outlined':
				return `rounded-3xl border-current border`
			case 'text':
				return `rounded-3xl`
			default:
				return `rounded-md text-white`
		}
	
	}, [variant])

	return (
		<button
			ref={ref}
			className={twMerge('font-bold p-2 flex items-center cursor-pointer', variantClass, className)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	)
})