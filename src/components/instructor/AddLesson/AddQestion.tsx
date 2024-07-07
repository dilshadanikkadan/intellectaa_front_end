"use client";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  codeExcuteHelper,
  codeFetchHelper,
} from "@/helpers/course/courseApiHelper";

const AddQuestion = () => {
  const [code, setCode] = useState<string>("");

  const { data: currentCode } = useQuery({
    queryFn: codeFetchHelper,
    queryKey: ["code"],
  });

  useEffect(() => {
    if (currentCode?.payload) {
      setCode(currentCode.payload);
    }
  }, [currentCode]);

  const { mutate: runCodeMutate } = useMutation({
    mutationFn: codeExcuteHelper,
    onSuccess: (data) => {
      console.log("data", data?.payload);
    },
  });

  const runCode = () => {
    runCodeMutate({ code ,language:"python"});
  };

  const onChange = (newValue: string) => {
    setCode(newValue);
  };

  return (
    <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
      <AceEditor
        mode="javascript"
        theme="tomorrow"
        onChange={onChange}
        value={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        fontSize={14}
        width="75%"
        height="75%"
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        className="rounded-lg"
      />
      <button onClick={runCode} className="py-2 px-5 rounded-lg bg-teal mt-3">
        run
      </button>
    </div>
  );
};

export default AddQuestion;