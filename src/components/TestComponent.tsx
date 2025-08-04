import { useTranslation } from "react-i18next";

const TestComponent = () => {
  const { t, ready } = useTranslation();
  
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{t("hero.headline")}</h1>
      <p>{t("hero.subheadline")}</p>
    </div>
  );
};

export default TestComponent;
