export default function Heading({ heading, subheading } : { heading: string; subheading: string }) {
    return (
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
            <p className="text-muted-foreground">{subheading}</p>
        </div>
    )
}