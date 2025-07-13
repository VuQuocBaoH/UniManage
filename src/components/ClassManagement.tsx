
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Calendar, MapPin, Clock, Users, Filter, FilterX } from "lucide-react";
import ClassDetail from "./ClassDetail";

const ClassManagement = () => {
  const [classes] = useState([
    {
      id: "LH001",
      name: "Lập trình Web - Lớp A",
      course: "Lập trình Web",
      courseCode: "IT301",
      instructor: "TS. Nguyễn Văn Minh",
      schedule: "Thứ 2, 4 - 8:00-11:00",
      room: "P201",
      capacity: 50,
      enrolled: 45,
      semester: "HK1 2024-2025",
      status: "Đang diễn ra",
      code: "LH001",
      subject: "Lập trình Web",
      teacher: "TS. Nguyễn Văn Minh",
      time: "Thứ 2, 4 - 8:00-11:00",
      students: 45,
      startDate: "01/09/2024",
      endDate: "15/12/2024",
      description: "Lớp học lập trình web cơ bản với HTML, CSS, JavaScript"
    },
    {
      id: "LH002",
      name: "Kinh tế Vi mô - Lớp B", 
      course: "Kinh tế học Vi mô",
      courseCode: "ECO201",
      instructor: "ThS. Trần Thị Lan",
      schedule: "Thứ 3, 5 - 13:30-16:30", 
      room: "P305",
      capacity: 60,
      enrolled: 55,
      semester: "HK1 2024-2025",
      status: "Đang diễn ra",
      code: "LH002",
      subject: "Kinh tế học Vi mô",
      teacher: "ThS. Trần Thị Lan",
      time: "Thứ 3, 5 - 13:30-16:30",
      students: 55,
      startDate: "01/09/2024",
      endDate: "15/12/2024",
      description: "Lớp học kinh tế vi mô về hành vi các đơn vị kinh tế"
    },
    {
      id: "LH003",
      name: "Cơ học Kỹ thuật - Lớp C",
      course: "Cơ học Kỹ thuật", 
      courseCode: "ENG101",
      instructor: "PGS.TS. Lê Hoàng Nam",
      schedule: "Thứ 6 - 7:30-11:30",
      room: "P102",
      capacity: 40,
      enrolled: 38,
      semester: "HK1 2024-2025", 
      status: "Tạm dừng",
      code: "LH003",
      subject: "Cơ học Kỹ thuật",
      teacher: "PGS.TS. Lê Hoàng Nam",
      time: "Thứ 6 - 7:30-11:30",
      students: 38,
      startDate: "01/09/2024",
      endDate: "15/12/2024",
      description: "Lớp học cơ học kỹ thuật ứng dụng"
    },
    {
      id: "LH004",
      name: "Tiếng Anh Thương mại - Lớp D",
      course: "Tiếng Anh Thương mại",
      courseCode: "ENG205",
      instructor: "GS. Hoàng Thị Mai",
      schedule: "Thứ 2, 4 - 13:30-16:30",
      room: "P401",
      capacity: 35,
      enrolled: 32,
      semester: "HK2 2023-2024",
      status: "Đã kết thúc",
      code: "LH004",
      subject: "Tiếng Anh Thương mại",
      teacher: "GS. Hoàng Thị Mai",
      time: "Thứ 2, 4 - 13:30-16:30",
      students: 32,
      startDate: "01/02/2024",
      endDate: "15/06/2024",
      description: "Lớp học tiếng Anh chuyên ngành thương mại"
    },
    {
      id: "LH005",
      name: "Thuật toán - Lớp E",
      course: "Thuật toán và Cấu trúc dữ liệu",
      courseCode: "IT302",
      instructor: "ThS. Phan Văn Đức",
      schedule: "Thứ 3, 5 - 8:00-11:00",
      room: "P203",
      capacity: 45,
      enrolled: 0,
      semester: "HK2 2024-2025",
      status: "Sắp bắt đầu",
      code: "LH005",
      subject: "Thuật toán và Cấu trúc dữ liệu",
      teacher: "ThS. Phan Văn Đức",
      time: "Thứ 3, 5 - 8:00-11:00",
      students: 0,
      startDate: "01/02/2025",
      endDate: "15/06/2025",
      description: "Lớp học thuật toán và cấu trúc dữ liệu"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [instructorFilter, setInstructorFilter] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || classItem.status === statusFilter;
    const matchesSemester = semesterFilter === "all" || classItem.semester === semesterFilter;
    const matchesInstructor = instructorFilter === "all" || classItem.instructor === instructorFilter;

    return matchesSearch && matchesStatus && matchesSemester && matchesInstructor;
  });

  const clearFilters = () => {
    setStatusFilter("all");
    setSemesterFilter("all");
    setInstructorFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = statusFilter !== "all" || semesterFilter !== "all" || instructorFilter !== "all" || searchTerm !== "";

  const handleEdit = (classItem: any) => {
    setSelectedClass(classItem);
    setShowDetail(true);
  };

  const handleDelete = (classItem: any) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa lớp học ${classItem.name}?`)) {
      console.log("Deleting class:", classItem.id);
      // TODO: Implement delete functionality
    }
  };

  const handleSave = (updatedClass: any) => {
    console.log("Saving class:", updatedClass);
    // TODO: Implement save functionality
    setShowDetail(false);
    setSelectedClass(null);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedClass(null);
  };

  if (showDetail && selectedClass) {
    return (
      <ClassDetail
        classItem={selectedClass}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang diễn ra":
        return <Badge className="bg-green-100 text-green-800">Đang diễn ra</Badge>;
      case "Tạm dừng":
        return <Badge className="bg-yellow-100 text-yellow-800">Tạm dừng</Badge>;
      case "Đã kết thúc":
        return <Badge className="bg-gray-100 text-gray-800">Đã kết thúc</Badge>;
      case "Sắp bắt đầu":
        return <Badge className="bg-blue-100 text-blue-800">Sắp bắt đầu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getEnrollmentStatus = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) {
      return "text-red-600";
    } else if (percentage >= 70) {
      return "text-yellow-600"; 
    } else {
      return "text-green-600";
    }
  };

  const uniqueStatuses = [...new Set(classes.map(c => c.status))];
  const uniqueSemesters = [...new Set(classes.map(c => c.semester))];
  const uniqueInstructors = [...new Set(classes.map(c => c.instructor))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Lớp học</h2>
          <p className="text-gray-600">Quản lý lịch học và thông tin các lớp học</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Lớp học
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
                  placeholder="Tìm kiếm theo tên lớp, mã môn hoặc giảng viên..."
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Học kỳ</Label>
                <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo học kỳ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả học kỳ</SelectItem>
                    {uniqueSemesters.map(semester => (
                      <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Giảng viên</Label>
                <Select value={instructorFilter} onValueChange={setInstructorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo giảng viên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả giảng viên</SelectItem>
                    {uniqueInstructors.map(instructor => (
                      <SelectItem key={instructor} value={instructor}>{instructor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Đang hiển thị {filteredClasses.length} / {classes.length} lớp học</span>
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
                <p className="text-sm font-medium text-gray-600">Tổng Lớp học</p>
                <p className="text-2xl font-bold text-gray-900">124</p>
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
                <p className="text-2xl font-bold text-gray-900">98</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ lấp đầy</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Phòng học</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Lớp học</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredClasses.length} lớp học` : `Tổng cộng ${filteredClasses.length} lớp học`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã lớp</TableHead>
                <TableHead>Tên lớp</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Thời gian & Địa điểm</TableHead>
                <TableHead>Sĩ số</TableHead>
                <TableHead>Học kỳ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy lớp học phù hợp với bộ lọc" : "Chưa có lớp học nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredClasses.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">{classItem.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.name}</div>
                        <div className="text-sm text-gray-500">{classItem.courseCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>{classItem.instructor}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Clock className="h-3 w-3 mr-1 text-blue-600" />
                          {classItem.schedule}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {classItem.room}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center ${getEnrollmentStatus(classItem.enrolled, classItem.capacity)}`}>
                        <Users className="h-4 w-4 mr-1" />
                        {classItem.enrolled}/{classItem.capacity}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((classItem.enrolled / classItem.capacity) * 100)}%
                      </div>
                    </TableCell>
                    <TableCell>{classItem.semester}</TableCell>
                    <TableCell>{getStatusBadge(classItem.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(classItem)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(classItem)}>
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

export default ClassManagement;
