export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-md border bg-white ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
