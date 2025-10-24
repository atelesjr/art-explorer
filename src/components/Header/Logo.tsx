interface LogoProps {
    className?: string;
}

export function Logo({ className = '' }: LogoProps) {
    return (
        <div
            className={`font-bold flex flex-col items-center font-serif -top-0.5 relative ${className}`}
        >
            <div className="text-[40px] sm:text-[45px] leading-[0.9]">ART</div>
            <div className="text-[21px] font-light leading-none">Explorer</div>
        </div>
    );
}