import {Minus, Plus} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {Button} from "./ui/button";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "./ui/table";
import {useState} from "react";
import {useCartStore} from "@/stores/useUserCart.ts";
import {CartItem} from "@/types/cartType";
import CheckoutConfirmPage from "@/components/CheckoutConfirmPage.tsx";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, decrementQuantity, incrementQuantity, removeFromTheCart } = useCartStore();

  const totalAmount = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link">Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Remove</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.imageUrl} alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell> {item.name}</TableCell>
              <TableCell> {item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size={"icon"}
                    className="font-bold border-none"
                    disabled
                    variant={"outline"}
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size={"icon"}
                    className="rounded-full bg-orange hover:bg-hoverOrange"
                    variant={"outline"}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button size={"sm"} onClick={() => removeFromTheCart(item._id)}>
                  Remove
                </Button>
              </TableCell>
              <TableCell className='text-right'>{item.price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;