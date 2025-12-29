// Generate static params for static export
export async function generateStaticParams({ classId, id }: { classId: string; id: string }) {
  // Generate IDs from 1 to 1000 for student IDs
  return {
    classId,
    id,
  };
}

export default function StudentIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

