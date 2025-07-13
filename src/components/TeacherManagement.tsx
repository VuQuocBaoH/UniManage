import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Mail, Phone, Award, Filter, FilterX, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import TeacherDetail from "./TeacherDetail";
import TeacherForm from "./TeacherForm";
import { useTeachers, type Teacher } from "@/hooks/useTeachers";
import { useDeleteTeacher } from "@/hooks/useTeacherMutations";

const TeacherManagement = () => {
  const { data: teachers = [], isLoading, error } = useTeachers();
  const deleteTeacher = useDeleteTeacher();

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacher_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || teacher.department === departmentFilter;
    const matchesDegree = degreeFilter === "all" || teacher.degree === degreeFilter;
    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesDegree && matchesStatus;
  });

  const clearFilters = () => {
    setDepartmentFilter("all");
    setDegreeFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = departmentFilter !== "all" || degreeFilter !== "all" || statusFilter !== "all" || searchTerm !== "";

  const handleCreate = () => {
    setSelectedTeacher(null);
    setFormMode("create");
    setShowForm(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleDelete = (teacher: Teacher) => {
    deleteTeacher.mutate(teacher.id);
  };

  const handleViewDetail = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowDetail(true);
  };

  const handleSave = (updatedTeacher: any) => {
    console.log("Saving teacher:", updatedTeacher);
    setShowDetail(false);
    setSelectedTeacher(null);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedTeacher(null);
  };

  if (showDetail && selectedTeacher) {
    return (
      <TeacherDetail
        teacher={{
          id: selectedTeacher.teacher_id,
          name: selectedTeacher.name,
          email: selectedTeacher.email,
          phone: selectedTeacher.phone || "",
          department: selectedTeacher.department,
          degree: selectedTeacher.degree,
          experience: selectedTeacher.experience || "",
          status: selectedTeacher.status,
          specialization: selectedTeacher.specialization || "",
          courses: "3",
        }}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang làm việc":
        return <Badge className="bg-green-100 text-green-800">Đang làm việc</Badge>;
      case "Nghỉ phép":
        return <Badge className="bg-yellow-100 text-yellow-800">Nghỉ phép</Badge>;
      case "Nghỉ hưu":
        return <Badge className="bg-gray-100 text-gray-800">Nghỉ hưu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueDepartments = [...new Set(teachers.map(t => t.department))];
  const uniqueDegrees = [...new Set(teachers.map(t => t.degree))];
  const uniqueStatuses = [...new Set(teachers.map(t => t.status))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải dữ liệu giảng viên...</span>
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
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Giảng viên</h2>
          <p className="text-gray-600">Quản lý thông tin giảng viên và nhân sự</p>
        </div>
        
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Giảng viên
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
                  placeholder="Tìm kiếm theo tên, mã giảng viên hoặc khoa..."
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Khoa</Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả khoa</SelectItem>
                    {uniqueDepartments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Học vị</Label>
                <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo học vị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả học vị</SelectItem>
                    {uniqueDegrees.map(degree => (
                      <SelectItem key={degree} value={degree}>{degree}</SelectItem>
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
                <span>Đang hiển thị {filteredTeachers.length} / {teachers.length} giảng viên</span>
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
                <p className="text-sm font-medium text-gray-600">Tổng Giảng viên</p>
                <p className="text-2xl font-bold text-gray-900">{teachers.length}</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang làm việc</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teachers.filter(t => t.status === "Đang làm việc").length}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiến sĩ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teachers.filter(t => t.degree === "Tiến sĩ").length}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Khoa</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueDepartments.length}</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Giảng viên</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredTeachers.length} giảng viên` : `Tổng cộng ${filteredTeachers.length} giảng viên`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GV</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Học vị</TableHead>
                <TableHead>Kinh nghiệm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy giảng viên phù hợp với bộ lọc" : "Chưa có giảng viên nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.teacher_id}</TableCell>
                    <TableCell>
                      <div 
                        className="font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => handleViewDetail(teacher)}
                      >
                        {teacher.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {teacher.email}
                        </div>
                        {teacher.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {teacher.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-blue-600" />
                        {teacher.degree}
                      </div>
                    </TableCell>
                    <TableCell>{teacher.experience || "Chưa cập nhật"}</TableCell>
                    <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(teacher)}>
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
                                Bạn có chắc chắn muốn xóa giảng viên <strong>{teacher.name}</strong>? 
                                Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(teacher)}
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

      <TeacherForm
        open={showForm}
        onOpenChange={setShowForm}
        teacher={formMode === "edit" ? selectedTeacher : null}
        mode={formMode}
      />
    </div>
  );
};

export default TeacherManagement;
