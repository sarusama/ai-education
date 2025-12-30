// Generate static params for static export
export async function generateStaticParams({ classId, id }: { classId: string; id: string }) {
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

