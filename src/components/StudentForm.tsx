
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateStudent, useUpdateStudent } from "@/hooks/useStudentMutations";
import type { Student } from "@/hooks/useStudents";

interface StudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  mode: "create" | "edit";
}

const StudentForm = ({ open, onOpenChange, student, mode }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    student_id: student?.student_id || "",
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    major: student?.major || "",
    year: student?.year || "",
    gpa: student?.gpa || 0,
    status: student?.status || "Đang học",
    address: student?.address || "",
    class: student?.class || "",
    credits: student?.credits || 0,
  });

  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "create") {
      createMutation.mutate(formData, {
        onSuccess: () => {
          onOpenChange(false);
          setFormData({
            student_id: "",
            name: "",
            email: "",
            phone: "",
            major: "",
            year: "",
            gpa: 0,
            status: "Đang học",
            address: "",
            class: "",
            credits: 0,
          });
        }
      });
    } else if (student) {
      updateMutation.mutate(
        { id: student.id, data: formData },
        {
          onSuccess: () => {
            onOpenChange(false);
          }
        }
      );
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Thêm sinh viên mới" : "Chỉnh sửa sinh viên"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Nhập thông tin để thêm sinh viên mới vào hệ thống"
              : "Cập nhật thông tin sinh viên"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student_id">Mã sinh viên *</Label>
              <Input
                id="student_id"
                value={formData.student_id}
                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Ngành học *</Label>
              <Select
                value={formData.major}
                onValueChange={(value) => setFormData({ ...formData, major: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngành học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                  <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                  <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                  <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Năm học *</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => setFormData({ ...formData, year: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn năm học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Đang học">Đang học</SelectItem>
                  <SelectItem value="Tạm dừng">Tạm dừng</SelectItem>
                  <SelectItem value="Tốt nghiệp">Tốt nghiệp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Lớp</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Tín chỉ tích lũy</Label>
              <Input
                id="credits"
                type="number"
                min="0"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : mode === "create" ? "Thêm" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;
