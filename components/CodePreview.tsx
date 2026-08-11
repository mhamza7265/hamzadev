import { codeToHtml } from "shiki";

interface CodePreviewProps {
  code: string;
  language?: string;
}

const CodePreview = async ({
  code,
  language = "typescript",
}: CodePreviewProps) => {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "vitesse-dark",
  });

  return (
    <div
      className="overflow-x-auto rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodePreview;
