export type TMusicRelease = {
    id: string;
    title: string;
    coverUrl: string;
    externalUrl?: string;
    comingSoon?: boolean;
    size: "small" | "medium" | "large";
    animationCredit?: string;
}