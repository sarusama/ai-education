// Generate static params for static export
export async function generateStaticParams() {
  // Generate IDs from 1 to 1000 for student IDs
  return Array.from({ length: 1000 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function StudentIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

