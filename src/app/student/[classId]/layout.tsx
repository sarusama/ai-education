// Generate static params for classId segment
export async function generateStaticParams() {
  // Generate class IDs - update with actual class IDs as needed
  // For now, generating a few default class IDs
  return [
    { classId: "1" },
    { classId: "2" },
    { classId: "3" },
  ];
}

export default function ClassIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

