import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import { useBookSearchModalToggle } from "@/hooks/useCaroKann/useBookSearchModalToggle";
import { IoClose } from "react-icons/io5";
import { handleSubmit, register } from "@/hooks/useSicilian/reportSearch";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./SideMenu.module.css";
import clsx from "clsx";
import Label from "../forms/Label";
import Input from "../forms/Input";
import Link from "next/link";

export default function SideMenu() {
  const [toggle, setToggle] = useSideMenuToggle();
  const [_, setBookSearchModalState] = useBookSearchModalToggle();
  const { push } = useRouterAdv();

  return (
    <>
      <aside className={clsx(styles.root, toggle && styles.open)}>
        <button type="button" className={styles.closeButton} onClick={() => setToggle((prev) => !prev)}>
          <IoClose />
        </button>

        <menu className={styles.menu}>
          <button type="button" onClick={() => setBookSearchModalState((prev) => !prev)}>
            리뷰 작성
          </button>
          <Link href="/my/reports">내 리뷰</Link>
          <Link href="/my/liked">좋아요한 리뷰</Link>
          <br />
          <br />
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              push({ pathname: "/search", query: { keyword: data.keyword } }, "/search");
            })}
          >
            <Label
              className={styles.label}
              htmlFor="keyword"
              input={() => Input({ ...register("keyword"), placeholder: "검색어를 입력해주세요" })}
            />
          </form>
        </menu>
      </aside>
    </>
  );
}
