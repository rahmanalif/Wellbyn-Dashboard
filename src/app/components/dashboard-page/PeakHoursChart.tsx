import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PeakHoursData {
  name: string;
  appointments: number;
}

interface PeakHoursChartProps {
  data: PeakHoursData[];
}

export function PeakHoursChart({ data }: PeakHoursChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Peak Hours</h2>
        <p className="text-sm text-gray-500 mt-1">
          This graph displays the number of appointment peak hour.
        </p>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="appointments" fill="#2E8BC9" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}