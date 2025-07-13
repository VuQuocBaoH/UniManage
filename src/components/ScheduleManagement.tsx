
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Clock, MapPin, User, Calendar, Filter, FilterX, Loader2 } from "lucide-react";
import { useSchedules } from "@/hooks/useSchedules";

const ScheduleManagement = () => {
  const { data: schedules = [], isLoading, error } = useSchedules();

  const [searchTerm, setSearchTerm] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("all");

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDay = dayFilter === "all" || schedule.day_of_week === dayFilter;
    const matchesStatus = statusFilter === "all" || schedule.status === statusFilter;
    const matchesBuilding = buildingFilter === "all" || schedule.building === buildingFilter;

    return matchesSearch && matchesDay && matchesStatus && matchesBuilding;
  });

  const clearFilters = () => {
    setDayFilter("all");
    setStatusFilter("all"); 
    setBuildingFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = dayFilter !== "all" || statusFilter !== "all" || buildingFilter !== "all" || searchTerm !== "";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang diễn ra":
        return <Badge className="bg-green-100 text-green-800">Đang diễn ra</Badge>;
      case "Sắp bắt đầu":
        return <Badge className="bg-blue-100 text-blue-800">Sắp bắt đầu</Badge>;
      case "Tạm hoãn":
        return <Badge className="bg-yellow-100 text-yellow-800">Tạm hoãn</Badge>;
      case "Đã kết thúc":
        return <Badge className="bg-gray-100 text-gray-800">Đã kết thúc</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueDays = [...new Set(schedules.map(s => s.day_of_week))];
  const uniqueStatuses = [...new Set(schedules.map(s => s.status))];
  const uniqueBuildings = [...new Set(schedules.map(s => s.building))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải lịch học...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Có lỗi xảy ra khi tải dữ liệu: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lịch học</h2>
          <p className="text-gray-600">Quản lý thời khóa biểu và lịch học của các lớp</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm lịch học
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo môn học, giảng viên hoặc phòng học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <FilterX className="h-4 w-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Thứ</Label>
                <Select value={dayFilter} onValueChange={setDayFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo thứ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả các thứ</SelectItem>
                    {uniqueDays.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    {uniqueStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Tòa nhà</Label>
                <Select value={buildingFilter} onValueChange={setBuildingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo tòa nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tòa nhà</SelectItem>
                    {uniqueBuildings.map(building => (
                      <SelectItem key={building} value={building}>{building}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Đang hiển thị {filteredSchedules.length} / {schedules.length} lịch học</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng lịch học</p>
                <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang diễn ra</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === "Đang diễn ra").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Phòng học</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(schedules.map(s => s.room)).size}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Giảng viên</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(schedules.map(s => s.instructor)).size}
                </p>
              </div>
              <User className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Thời khóa biểu</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredSchedules.length} lịch học` : `Tổng cộng ${filteredSchedules.length} lịch học`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Môn học</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Sinh viên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy lịch học phù hợp với bộ lọc" : "Chưa có lịch học nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{schedule.course_name}</div>
                        <div className="text-sm text-gray-500">{schedule.course_code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {schedule.instructor}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                          {schedule.day_of_week}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {schedule.time_slot}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-red-600" />
                          {schedule.room}
                        </div>
                        <div className="text-sm text-gray-600">{schedule.building}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium">{schedule.students}</span>
                        <span className="text-sm text-gray-500 ml-1">sinh viên</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManagement;
