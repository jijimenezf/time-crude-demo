import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import WorkSessionFormRow from "@/components/WorkSessionFormRow";

type Props = {
  params: {
    id: string;
  };
};

export default async function AccountDetailPage({ params }: Props) {
  const account = await db.account.findUniqueOrThrow({
    select: {
      id: true,
      name: true,
      workSessions: true,
    },
    where: { id: params.id },
  });

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold mb-8">{account.name}</h1>

      <div>
        <WorkSessionFormRow account={account} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {account.workSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  {session.startsOn?.toISOString().substring(0, 10)}
                </TableCell>
                <TableCell>{session.description}</TableCell>
                <TableCell>{session.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
