interface AssetSelectorProps extends React.PropsWithChildren {
  selectedAsset: string;
  asset: string;
  setAsset: React.Dispatch<React.SetStateAction<string>>;
}

const AssetSelectorButton: React.FC<AssetSelectorProps> = (props) => {
  return (
    <div
      className={`flex flex-col items-center rounded-md hover:cursor-pointer pt-2 active:bg-gray-300 active:dark:bg-gray-700 justify-center ${
        props.selectedAsset === props.asset
          ? "bg-sky-300 dark:bg-sky-950"
          : null
      }`}
      onClick={() => {
        props.setAsset(props.asset);
      }}
    >
      {props.children}
    </div>
  );
};

export default AssetSelectorButton;
