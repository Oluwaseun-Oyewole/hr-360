"use client";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import { useState, type PropsWithChildren } from "react";

export const RootStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  // useServerInsertedHTML(() => {
  //   return (
  //     <script
  //       dangerouslySetInnerHTML={{
  //         __html: `</script>${extractStyle(cache)}<script>`,
  //       }}
  //     />
  //   );
  // });

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    ></style>
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
