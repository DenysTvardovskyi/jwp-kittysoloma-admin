import { FC } from "react";
import { Input, InputProps } from "antd";

interface IProps extends InputProps {
  onSearch?: (value: string) => void;
  placeholder: string;
}

export const SearchBar: FC<IProps> = (props: IProps): JSX.Element => {
  return <Input.Search allowClear enterButton="Search" size="large" {...props} />;
};
