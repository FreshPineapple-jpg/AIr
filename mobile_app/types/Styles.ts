export interface CollapsibleSectionProps {
    title: string;
    icon: string;
    children: React.ReactNode;
    initiallyExpanded?: boolean;
}