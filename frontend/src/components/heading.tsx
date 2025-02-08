interface HeadingProps {
  title: string
  subtitle?: string
}

export default function Heading({ title, subtitle = "Build Work Experience through skills challenges" }: HeadingProps) {
  return (
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm md:text-base text-gray-600">{subtitle}</p>
      </div>
  )
}
