import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Mail, Phone, GraduationCap, Filter, FilterX, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import StudentDetail from "./StudentDetail";
import StudentForm from "./StudentForm";
import { useStudents, type Student } from "@/hooks/useStudents";
import { useDeleteStudent } from "@/hooks/useStudentMutations";

const StudentManagement = () => {
  const { data: students = [], isLoading, error } = useStudents();
  const deleteStudent = useDeleteStudent();

  const [searchTerm, setSearchTerm] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMajor = majorFilter === "all" || student.major === majorFilter;
    const matchesYear = yearFilter === "all" || student.year === yearFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesMajor && matchesYear && matchesStatus;
  });

  const clearFilters = () => {
    setMajorFilter("all");
    setYearFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = majorFilter !== "all" || yearFilter !== "all" || statusFilter !== "all" || searchTerm !== "";

  const handleCreate = () => {
    setSelectedStudent(null);
    setFormMode("create");
    setShowForm(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleDelete = (student: Student) => {
    deleteStudent.mutate(student.id);
  };

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setShowDetail(true);
  };

  const handleSave = (updatedStudent: any) => {
    console.log("Saving student:", updatedStudent);
    setShowDetail(false);
    setSelectedStudent(null);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedStudent(null);
  };

  if (showDetail && selectedStudent) {
    return (
      <StudentDetail
        student={{
          id: selectedStudent.student_id,
          name: selectedStudent.name,
          email: selectedStudent.email,
          phone: selectedStudent.phone || "",
          major: selectedStudent.major,
          year: selectedStudent.year,
          gpa: selectedStudent.gpa || 0,
          status: selectedStudent.status,
          address: selectedStudent.address || "",
          class: selectedStudent.class || "",
          credits: selectedStudent.credits || 0
        }}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang học":
        return <Badge className="bg-green-100 text-green-800">Đang học</Badge>;
      case "Tạm dừng":
        return <Badge className="bg-yellow-100 text-yellow-800">Tạm dừng</Badge>;
      case "Tốt nghiệp":
        return <Badge className="bg-blue-100 text-blue-800">Tốt nghiệp</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueMajors = [...new Set(students.map(s => s.major))];
  const uniqueYears = [...new Set(students.map(s => s.year))];
  const uniqueStatuses = [...new Set(students.map(s => s.status))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải dữ liệu sinh viên...</span>
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
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Sinh viên</h2>
          <p className="text-gray-600">Quản lý thông tin sinh viên và học viên</p>
        </div>
        
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Sinh viên
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
                  placeholder="Tìm kiếm theo tên, mã sinh viên hoặc ngành..."
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Ngành học</Label>
                <Select value={majorFilter} onValueChange={setMajorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo ngành" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả ngành</SelectItem>
                    {uniqueMajors.map(major => (
                      <SelectItem key={major} value={major}>{major}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Năm học</Label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo năm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả năm</SelectItem>
                    {uniqueYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
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
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Đang hiển thị {filteredStudents.length} / {students.length} sinh viên</span>
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
                <p className="text-sm font-medium text-gray-600">Tổng Sinh viên</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang học</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === "Đang học").length}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tốt nghiệp</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === "Tốt nghiệp").length}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GPA Trung bình</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length > 0 
                    ? (students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length).toFixed(1)
                    : "0.0"
                  }
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Sinh viên</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredStudents.length} sinh viên` : `Tổng cộng ${filteredStudents.length} sinh viên`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã SV</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Ngành học</TableHead>
                <TableHead>Năm học</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy sinh viên phù hợp với bộ lọc" : "Chưa có sinh viên nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.student_id}</TableCell>
                    <TableCell>
                      <div 
                        className="font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => handleViewDetail(student)}
                      >
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {student.email}
                        </div>
                        {student.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {student.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{student.major}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.gpa}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa sinh viên <strong>{student.name}</strong>? 
                                Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(student)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <StudentForm
        open={showForm}
        onOpenChange={setShowForm}
        student={formMode === "edit" ? selectedStudent : null}
        mode={formMode}
      />
    </div>
  );
};

export default StudentManagement;
