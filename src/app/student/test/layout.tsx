// Generate static params for id segment
// This function receives params from parent segments (classId)
export async function generateStaticParams({
  params,
}: {
  params: { classId: string };
}) {
  // Generate student IDs from 1 to 1000 for each class
  // Update the range as needed
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

