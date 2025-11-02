import { cn } from "@/lib/utils";

interface Option {
  value: string;
  image: string;
  label: string;
}

interface ImageSelectorProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const ImageSelector = ({ options, value, onChange }: ImageSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "relative group overflow-hidden rounded-xl transition-all duration-300",
            "border-2 hover:scale-105 hover:shadow-lg",
            value === option.value
              ? "border-primary shadow-lg scale-105 ring-4 ring-primary/20"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="aspect-square relative">
            <img
              src={option.image}
              alt={option.label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay gradient */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                value === option.value
                  ? "bg-gradient-to-t from-primary/60 to-transparent"
                  : "bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100"
              )}
            />
            
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
              <span
                className={cn(
                  "text-sm font-semibold transition-all duration-300",
                  value === option.value
                    ? "text-white drop-shadow-lg"
                    : "text-white/90 group-hover:text-white"
                )}
              >
                {option.label}
              </span>
            </div>
            
            {/* Selected indicator */}
            {value === option.value && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ImageSelector;
