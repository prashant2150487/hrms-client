import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  MapPin, 
  Calendar,
  MoreHorizontal 
} from 'lucide-react';
import axiosInstance from '@/lib/axios';

interface AttendanceRecord {
  date: string;
  dayOfWeek: string;
  attendancePercentage: number;
  effectiveHours: string;
  grossHours: string;
  arrivalStatus: 'On Time' | 'Late' | 'Early';
  specialStatus?: 'W-OFF' | 'LEAVE' | 'SICK';
  statusType?: 'weekly-off' | 'leave' | 'sick' | 'present';
  hasLocation?: boolean;
  totalHours?: string;
  status?: string;
} 
const AttendanceTable: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30 DAYS');
  const [attendanceData,setAttendanceData]=useState([])
  
  const periods = ['30 DAYS', 'JUN', 'MAY', 'APR', 'MAR', 'FEB', 'JAN'];

  const getStatusBadge = (record: AttendanceRecord) => {
    if (record.specialStatus === 'W-OFF') {
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
          W-OFF
        </Badge>
      );
    }
    if (record.specialStatus === 'LEAVE') {
      return (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
          LEAVE
        </Badge>
      );
    }
    return null;
  };

  const getStatusIcon = (record: AttendanceRecord) => {
    if (record.arrivalStatus === 'On Time' && record.statusType === 'present') {
      return <CheckCircle className="w-4 h-4 text-teal-500" />;
    }
    if (record.statusType === 'present' && record.attendancePercentage < 50) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    return null;
  };

  const getAttendanceVisual = (record: AttendanceRecord) => {
    if (record.statusType === 'weekly-off' || record.statusType === 'sick') {
      return <div className="w-full h-2 bg-slate-700 rounded-full" />;
    }
    
    return (
      <div className="w-full max-w-32">
        <Progress 
          value={record.attendancePercentage} 
          className="h-2 bg-slate-700"
          style={{
            '--progress-foreground': record.attendancePercentage > 80 ? '#14B8A6' : 
                                   record.attendancePercentage > 50 ? '#F59E0B' : '#EF4444'
          } as React.CSSProperties}
        />
      </div>
    );
  };

  const fetchAttendanceData = async () => {
    const response=await axiosInstance("/v1/attendance/status/summary/2024-06-02")
    setAttendanceData(response.data?.data?.dailySummaries)

  }
  useEffect(()=>{
    fetchAttendanceData()
  },[])
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-teal-400" />
              <CardTitle className="text-xl font-semibold text-white">
                Last 30 Days
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              {periods.map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={`text-xs font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-700">
                <tr>
                  <th className="text-left p-4 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Attendance Visual
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Effective Hours
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Gross Hours
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Log
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {attendanceData?.map((record : AttendanceRecord, index : number) => (
                  <tr 
                    key={index} 
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-white">
                         {record?.date}
                        </div>
                        {getStatusBadge(record)}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getAttendanceVisual(record)}
                        {record?.hasLocation && (
                          <MapPin className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {record?.statusType === 'present' && record?.attendancePercentage > 50 ? (
                          <div className="w-2 h-2 bg-teal-500 rounded-full" />
                        ) : record?.statusType === 'present' && record?.attendancePercentage <= 50 ? (
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        ) : null}
                        <span className={`text-sm ${
                          record?.statusType === 'weekly-off' || record?.statusType === 'sick'
                            ? 'text-slate-400'
                            : 'text-white'
                        }`}>
                          {record?.effectiveHours}
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <span className={`text-sm ${
                        record?.totalHours === '-' 
                          ? 'text-slate-400' 
                          : 'text-white'
                      }`}>
                        {record?.totalHours}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record)}
                        <span className="text-sm text-slate-300">
                          {record?.status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTable;