
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Clock, MapPin, FileText, Calendar, Users, AlertTriangle, Filter, FilterX } from "lucide-react";

const ExamScheduleManagement = () => {
  const [examSchedules] = useState([
    {
      id: "LT001",
      courseCode: "IT301",
      courseName: "Lập trình Web",
      examType: "Thi cuối kỳ",
      date: "2024-01-25",
      timeSlot: "07:30 - 09:30",
      room: "A101",
      building: "Nhà A",
      instructor: "TS. Nguyễn Văn Minh",
      students: 45,
      duration: "120 phút",
      semester: "HK1 2024-2025",
      status: "Đã lên lịch"
    },
    {
      id: "LT002",
      courseCode: "ECO201",
      courseName: "Kinh tế học Vi mô", 
      examType: "Thi giữa kỳ",
      date: "2024-01-22",
      timeSlot: "09:30 - 11:00",
      room: "B205",
      building: "Nhà B",
      instructor: "ThS. Trần Thị Lan",
      students: 62,
      duration: "90 phút",
      semester: "HK1 2024-2025",
      status: "Đang diễn ra"
    },
    {
      id: "LT003",
      courseCode: "ENG101",
      courseName: "Cơ học Kỹ thuật",
      examType: "Thi cuối kỳ",
      date: "2024-01-28", 
      timeSlot: "13:30 - 15:30",
      room: "C301",
      building: "Nhà C",
      instructor: "PGS.TS. Lê Hoàng Nam",
      students: 38,
      duration: "120 phút",
      semester: "HK1 2024-2025",
      status: "Hoãn thi"
    },
    {
      id: "LT004",
      courseCode: "ENG205",
      courseName: "Tiếng Anh Thương mại",
      examType: "Thi cuối kỳ",
      date: "2024-01-18",
      timeSlot: "15:30 - 17:00",
      room: "D102",
      building: "Nhà D", 
      instructor: "GS. Hoàng Thị Mai",
      students: 32,
      duration: "90 phút",
      semester: "HK1 2024-2025",
      status: "Đã hoàn thành"
    },
    {
      id: "LT005",
      courseCode: "IT302",
      courseName: "Thuật toán và Cấu trúc dữ liệu",
      examType: "Thi thực hành",
      date: "2024-01-30",
      timeSlot: "07:30 - 10:30",
      room: "Lab A203",
      building: "Nhà A",
      instructor: "ThS. Phan Văn Đức",
      students: 28,
      duration: "180 phút",
      semester: "HK1 2024-2025",
      status: "Sắp thi"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [examTypeFilter, setExamTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("all");

  const filteredExamSchedules = examSchedules.filter(exam => {
    const matchesSearch = exam.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesExamType = examTypeFilter === "all" || exam.examType === examTypeFilter;
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
    const matchesBuilding = buildingFilter === "all" || exam.building === buildingFilter;

    return matchesSearch && matchesExamType && matchesStatus && matchesBuilding;
  });

  const clearFilters = () => {
    setExamTypeFilter("all");
    setStatusFilter("all");
    setBuildingFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = examTypeFilter !== "all" || statusFilter !== "all" || buildingFilter !== "all" || searchTerm !== "";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã lên lịch":
        return <Badge className="bg-blue-100 text-blue-800">Đã lên lịch</Badge>;
      case "Đang diễn ra":
        return <Badge className="bg-green-100 text-green-800">Đang diễn ra</Badge>;
      case "Sắp thi":
        return <Badge className="bg-yellow-100 text-yellow-800">Sắp thi</Badge>;
      case "Đã hoàn thành":
        return <Badge className="bg-gray-100 text-gray-800">Đã hoàn thành</Badge>;
      case "Hoãn thi":
        return <Badge className="bg-red-100 text-red-800">Hoãn thi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "Thi cuối kỳ":
        return <Badge className="bg-purple-100 text-purple-800">Cuối kỳ</Badge>;
      case "Thi giữa kỳ":
        return <Badge className="bg-blue-100 text-blue-800">Giữa kỳ</Badge>;
      case "Thi thực hành":
        return <Badge className="bg-orange-100 text-orange-800">Thực hành</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const uniqueExamTypes = [...new Set(examSchedules.map(e => e.examType))];
  const uniqueStatuses = [...new Set(examSchedules.map(e => e.status))];
  const uniqueBuildings = [...new Set(examSchedules.map(e => e.building))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lịch Thi</h2>
          <p className="text-gray-600">Quản lý lịch thi và kiểm tra của các môn học</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm lịch thi
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
                  placeholder="Tìm kiếm theo môn học, giảng viên hoặc phòng thi..."
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Loại thi</Label>
                <Select value={examTypeFilter} onValueChange={setExamTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo loại thi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại thi</SelectItem>
                    {uniqueExamTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
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
                <span>Đang hiển thị {filteredExamSchedules.length} / {examSchedules.length} lịch thi</span>
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
                <p className="text-sm font-medium text-gray-600">Tổng buổi thi</p>
                <p className="text-2xl font-bold text-gray-900">284</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sắp thi</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Phòng thi</p>
                <p className="text-2xl font-bold text-gray-900">52</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cần xử lý</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch thi chi tiết</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredExamSchedules.length} buổi thi` : `Tổng cộng ${filteredExamSchedules.length} buổi thi`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Môn thi</TableHead>
                <TableHead>Loại thi</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Giám thị</TableHead>
                <TableHead>Thí sinh</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExamSchedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy lịch thi phù hợp với bộ lọc" : "Chưa có lịch thi nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredExamSchedules.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{exam.courseName}</div>
                        <div className="text-sm text-gray-500">{exam.courseCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getExamTypeBadge(exam.examType)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                          {exam.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {exam.timeSlot}
                        </div>
                        <div className="text-xs text-gray-500">
                          Thời gian: {exam.duration}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-red-600" />
                          {exam.room}
                        </div>
                        <div className="text-sm text-gray-600">{exam.building}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">{exam.instructor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium">{exam.students}</span>
                        <span className="text-sm text-gray-500 ml-1">thí sinh</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(exam.status)}</TableCell>
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

export default ExamScheduleManagement;
