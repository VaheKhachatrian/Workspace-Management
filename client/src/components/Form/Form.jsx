import React, { useState } from "react";
import { Drawer, Input, Button, Spin, message } from "antd";
import { useCheckSlugQuery, useCreateWorkspaceMutation } from "../../services/apiSlice";
import { useForm, Controller } from "react-hook-form";

const FormComponent = ({ visible, onClose }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [slug, setSlug] = useState("");
  const [variants, setVariants] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");

  const { data: slugData, isLoading: isCheckingSlug } = useCheckSlugQuery(slug, { skip: !slug });
  const [createWorkspace, { isLoading: isCreatingWorkspace }] = useCreateWorkspaceMutation();

  const onFormSubmit = async (values) => {
    try {
      if (slugData && slugData.isFree) {
        await createWorkspace(values).unwrap();
        message.success("Workspace created successfully.");
        window.location.reload();
      } else {
        message.warning("Slug is already taken. Try a different one.");
        setVariants(slugData?.variants || []);
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
      message.error("Failed to create workspace.");
    }
  };

  const handleSlugVariantClick = (variant) => {
    setSlug(variant);
    setValue("slug", variant);
    setSelectedSlug(variant);
  };

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      title="Create a New Workspace"
      width={600}
      placement={window.innerWidth < 768 ? "bottom" : "right"}
      height={window.innerWidth < 768 ? "auto" : "100%"}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label>Workspace Name</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Please enter a name" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter workspace name" />
            )}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Slug</label>
          <Controller
            name="slug"
            control={control}
            defaultValue={slug}
            rules={{ required: "Please enter a slug" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter slug"
                suffix={isCheckingSlug ? <Spin size="small" /> : null}
                onChange={(e) => {
                  setSlug(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          {errors.slug && <span>{errors.slug.message}</span>}
        </div>

        {variants.length > 0 && (
          <div style={{ marginBottom: "15px" }}>
            <p>Suggested slugs:</p>
            {variants.map((variant, index) => (
              <Button
                key={index}
                type={variant === selectedSlug ? "primary" : "dashed"}
                onClick={() => handleSlugVariantClick(variant)}
                style={{
                  marginRight: "5px",
                  marginBottom: "5px",
                  backgroundColor: variant === selectedSlug ? "#1890ff" : "",
                  borderColor: variant === selectedSlug ? "#1890ff" : ""
                }}
              >
                {variant}
              </Button>
            ))}
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <Button type="primary" htmlType="submit" block loading={isCreatingWorkspace}>
            {isCreatingWorkspace ? "Creating..." : "Submit"}
          </Button>
        </div>

        <div>
          <Button onClick={onClose} block>
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default FormComponent;
