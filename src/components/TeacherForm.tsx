
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTeacher, useUpdateTeacher } from "@/hooks/useTeacherMutations";
import type { Teacher } from "@/hooks/useTeachers";

interface TeacherFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher?: Teacher | null;
  mode: "create" | "edit";
}

const TeacherForm = ({ open, onOpenChange, teacher, mode }: TeacherFormProps) => {
  const [formData, setFormData] = useState({
    teacher_id: teacher?.teacher_id || "",
    name: teacher?.name || "",
    email: teacher?.email || "",
    phone: teacher?.phone || "",
    department: teacher?.department || "",
    degree: teacher?.degree || "",
    experience: teacher?.experience || "",
    status: teacher?.status || "Đang làm việc",
    specialization: teacher?.specialization || "",
  });

  const createMutation = useCreateTeacher();
  const updateMutation = useUpdateTeacher();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "create") {
      createMutation.mutate(formData, {
        onSuccess: () => {
          onOpenChange(false);
          setFormData({
            teacher_id: "",
            name: "",
            email: "",
            phone: "",
            department: "",
            degree: "",
            experience: "",
            status: "Đang làm việc",
            specialization: "",
          });
        }
      });
    } else if (teacher) {
      updateMutation.mutate(
        { id: teacher.id, data: formData },
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
            {mode === "create" ? "Thêm giảng viên mới" : "Chỉnh sửa giảng viên"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Nhập thông tin để thêm giảng viên mới vào hệ thống"
              : "Cập nhật thông tin giảng viên"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacher_id">Mã giảng viên *</Label>
              <Input
                id="teacher_id"
                value={formData.teacher_id}
                onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
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
              <Label htmlFor="department">Khoa *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoa" />
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
              <Label htmlFor="degree">Học vị *</Label>
              <Select
                value={formData.degree}
                onValueChange={(value) => setFormData({ ...formData, degree: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn học vị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                  <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                  <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                  <SelectItem value="Giáo sư">Giáo sư</SelectItem>
                  <SelectItem value="Phó Giáo sư">Phó Giáo sư</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Kinh nghiệm</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="VD: 5 năm"
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
                  <SelectItem value="Đang làm việc">Đang làm việc</SelectItem>
                  <SelectItem value="Nghỉ phép">Nghỉ phép</SelectItem>
                  <SelectItem value="Nghỉ hưu">Nghỉ hưu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Chuyên môn</Label>
            <Textarea
              id="specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="VD: Lập trình Web, Cơ sở dữ liệu, Thuật toán"
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

export default TeacherForm;
