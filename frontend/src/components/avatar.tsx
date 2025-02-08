import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function User({
  className,
  image = "",
  alt = "User Avatar",
  fallback = "U"
}: {
  className?: string,
  image: string | undefined | null,
  alt?: string,
  fallback?: string
}) {
  return (
    <div className={"relative w-fit h-fit"}  >
      <Avatar className={cn("border-2 border-card", className)}>
        <AvatarImage src={image || ""} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
