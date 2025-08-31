import useSWR from "swr";
import { Order } from "../lib/models";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout";
import { Alert, Button, Container} from "@mantine/core";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import api from "../lib/axios";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

export default function Order_Detail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [, setIsProcessing] = useState(false);

  const { data: orders, isLoading, error } = useSWR<Order>(`/orders/${orderId}`);

  const handleDelete = async (orderId: number) => {
    try {
      setIsProcessing(true);
      await api.delete(`/orders/${orderId}`);
      notifications.show({
        title: "ลบรายการสั่งซื้อสำเร็จ",
        message: "ลบรายการสั่งซื้อออกจากระบบเรียบร้อยแล้ว",
        color: "red",
      });
      navigate("/staff-ordering");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          notifications.show({
            title: "ไม่พบข้อมูลรายการสั่งซื้อ",
            message: "ไม่พบข้อมูลรายการสั่งซื้อต้องการลบ",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-4">
        {/* Loading state */}
        {isLoading && !error && <Loading />}

        {/* Error state */}
        {error && (
            <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
            >
            {error.message}
            </Alert>
        )}

        {/* Orders list */}
        {!!orders && (
                <div key={orders.id} className="mb-8">
                <h1>{orders.menu_name}</h1>
                <p className="italic text-neutral-500 mb-4">โดย {orders.customer_name}</p>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <img
                    src="https://placehold.co/150x200"
                    alt={orders.menu_name}
                    className="w-full object-cover aspect-[3/4]"
                    />
                    <div className="col-span-2 px-4 space-y-2 py-4">
                    <h3>รายละเอียด</h3>
                    <p className="indent-4">{orders.comment}</p>

                    <h3>จำนวนที่สั่ง</h3>
                    <p className="indent-4">{orders.order_amount}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <Button
                    color="red"
                    leftSection={<IconTrash />}
                    size="xs"
                    onClick={() => {
                        modals.openConfirmModal({
                        title: "คุณต้องการลบรายการคำสั่งซื้อนี้ใช่หรือไม่?",
                        children: (
                            <span className="text-xs">
                            เมื่อคุณดำเนินการลบรายการคำสั่งซื้อนี้แล้ว คุณจะไม่สามารถย้อนกลับได้
                            </span>
                        ),
                        labels: { confirm: "ลบ", cancel: "ยกเลิก" },
                        onConfirm: () => handleDelete(orders.id),
                        confirmProps: { color: "red" },
                        });
                    }}
                    >
                    ลบรายการสั่งซื้อ
                    </Button>
                </div>
                </div>
            )}
        </Container>

      </Layout>
    </>
  );
}
