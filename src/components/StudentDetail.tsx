
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Save, X, Phone, Mail, MapPin, Calendar, User, GraduationCap } from "lucide-react";

interface StudentDetailProps {
  student: any;
  onBack: () => void;
  onSave: (student: any) => void;
}

const StudentDetail = ({ student, onBack, onSave }: StudentDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);

  const handleSave = () => {
    onSave(editedStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStudent(student);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết Sinh viên</h2>
            <p className="text-gray-600">Xem và chỉnh sửa thông tin sinh viên</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin cá nhân */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedStudent.name}
                    onChange={(e) => setEditedStudent({...editedStudent, name: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{student.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentId">Mã sinh viên</Label>
                {isEditing ? (
                  <Input
                    id="studentId"
                    value={editedStudent.id}
                    onChange={(e) => setEditedStudent({...editedStudent, id: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{student.id}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedStudent.email}
                    onChange={(e) => setEditedStudent({...editedStudent, email: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    {student.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedStudent.phone}
                    onChange={(e) => setEditedStudent({...editedStudent, phone: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    {student.phone}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="major">Ngành học</Label>
                {isEditing ? (
                  <Select
                    value={editedStudent.major}
                    onValueChange={(value) => setEditedStudent({...editedStudent, major: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                      <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                      <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    {student.major}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Năm học</Label>
                {isEditing ? (
                  <Select
                    value={editedStudent.year}
                    onValueChange={(value) => setEditedStudent({...editedStudent, year: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {student.year}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={editedStudent.address}
                  onChange={(e) => setEditedStudent({...editedStudent, address: e.target.value})}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded flex items-start">
                  <MapPin className="mr-2 h-4 w-4 mt-1" />
                  {student.address}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Thông tin học tập */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin học tập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Trạng thái:</span>
              <Badge className={student.status === "Đang học" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {student.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Điểm GPA:</span>
              <span className="font-semibold">{student.gpa}/4.0</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tín chỉ tích lũy:</span>
              <span className="font-semibold">{student.credits || "120"}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Lớp:</span>
              <span className="font-semibold">{student.class || "CNTT2024A"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetail;
