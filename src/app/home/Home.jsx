import ImageCropUpload from "@/components/ImageCropUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BASE_URL from "@/config/BaseUrl";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
const DropdownIndicator = () => (
  <div className="p-2 flex items-center ">
    <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400" />
  </div>
);
const type = [
  {
    value: "Retailer",
    label: "Retailer",
  },
  {
    value: "Agent",
    label: "Agent",
  },
  {
    value: "WholeSaler",
    label: "WholeSaler",
  },
  {
    value: "Manufacture",
    label: "Manufacture",
  },
  {
    value: "Other",
    label: "Other",
  },
];
const categorytype = [
  {
    value: "Men",
    label: "Men",
  },
  {
    value: "Women",
    label: "Women",
  },
  {
    value: "Kids",
    label: "Kids",
  },
  {
    value: "Other",
    label: "Other",
  },
];
const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stars, setStars] = useState([]);
  const [participants, setParticipants] = useState({
    register_firm_name: "",
    fair_gst_number: "",
    register_email: "",
    register_phone: "",
    register_address: "",
    fair_attendgroup: "",
    register_categygroup: "",
    register_incategygroup: "",
    fair_profession: "",
    fair_note: "",
    fair_no_of_people: "",

    sub_data: [],
  });
  console.log(participants.sub_data, "sub_data");
  const [errors, setErrors] = useState({
    register_firm_name: "",
    fair_gst_number: "",
    register_email: "",
    register_phone: "",
    register_address: "",
    fair_attendgroup: "",
    register_categygroup: "",
    register_incategygroup: "",
    fair_profession: "",
    fair_note: "",
    fair_no_of_people: "",
  });

  const representativeTemplate = {
    idcardsub_rep_name: "",
    idcardsub_rep_mobile: null,
    idcardsub_rep_image: null,
  };

  const [representatives, setRepresentatives] = useState([
    { ...representativeTemplate },
  ]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const starCount = Math.floor(window.innerWidth / 50);

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: -10,
          size: Math.random() * 3 + 1,
          duration: 5 + Math.random() * 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 10000);
    return () => clearInterval(interval);
  }, []);

  const createIdCardMutation = useMutation({
    mutationFn: async (formData) => {
      // console.log("Mutation triggered with formData:");

      try {
        const response = await axios.post(
          `${BASE_URL}/api/insert-visitors-register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.msg || "ID Card created successfully",
        className: "bg-green-100 text-green-800",
      });
      navigate("/thankyou", {
        state: { fairid: data?.fairid },
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        variant: "destructive",
        className: "bg-red-100 text-red-800",
      });
    },
  });
  const selectedTypeValues = participants.register_categygroup
    ? participants.register_categygroup.split(",")
    : [];

  const showCategoryField = selectedTypeValues.includes("Other");
  const selectedTypes = participants.register_categygroup
    ? participants.register_categygroup.split(",")
    : [];
  const selectedCategory = participants.register_incategygroup
    ? participants.register_incategygroup.split(",")
    : [];
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      register_firm_name: "",
      fair_gst_number: "",
      register_email: "",
      register_phone: "",
      register_address: "",
      fair_attendgroup: "",
      register_categygroup: "",
      register_incategygroup: "",
      fair_profession: "",
      fair_note: "",
      fair_no_of_people: "",
      sub_data: [],
    };



    if (!participants.fair_gst_number.trim()) {
      newErrors.fair_gst_number = "GST is required";
      isValid = false;
    } else if (participants.fair_gst_number.trim().length < 4) {
      newErrors.fair_gst_number = "GST is required";
      isValid = false;
    }
    if (!participants.register_phone.trim()) {
      newErrors.register_phone = "Mobile Number is required";
      isValid = false;
    }
   

    if (selectedTypes.length == 0) {
      newErrors.register_categygroup = "Please select Type";
      isValid = false;
    }
    if (!participants.register_firm_name.trim()) {
      newErrors.register_firm_name = "Company is required";
      isValid = false;
    }
    if (!participants.register_address.trim()) {
      newErrors.register_address = "Places is required";
      isValid = false;
    }

    if (selectedCategory.length == 0) {
      newErrors.register_incategygroup = "Please select Category";
      isValid = false;
    }
    if (!participants.fair_no_of_people.trim()) {
      newErrors.fair_no_of_people = "No of People is required";
      isValid = false;
    }
    if (!participants.fair_profession.trim() && showCategoryField) {
      newErrors.fair_profession = "Profession is required";
      isValid = false;
    }

    if (!participants.register_email.trim()) {
      newErrors.register_email = "Email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participants.register_email)
    ) {
      newErrors.register_email = "Please enter a valid email";
      isValid = false;
    }
    if (!participants.register_phone.trim()) {
      newErrors.register_phone = "Mobile Number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(participants.register_phone.trim())) {
      newErrors.register_phone = "Mobile Number must 10 digits";
      isValid = false;
    }
    if (participants.sub_data?.length > 0) {
      const peopleErrors = [];

      participants.sub_data.forEach((person, index) => {
        const error = { fair_person_name: "", fair_person_image: "" };

        if (!person.fair_person_name.trim()) {
          error.fair_person_name = `Name required at row ${index + 1}`;
          isValid = false;
        }

        if (!person.fair_person_image) {
          error.fair_person_image = `Photo required at row ${index + 1}`;
          isValid = false;
        }

        peopleErrors.push(error);
      });

      newErrors.sub_data = peopleErrors;
    }
    setErrors(newErrors);
    return isValid;
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (["register_phone", "fair_no_of_people"].includes(name)) {
  //     if (!/^\d*$/.test(value)) return;
  //   }

  //   setParticipants((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   if (errors[name]) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [name]: "",
  //     }));
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for specific fields
    if (["register_phone", "fair_no_of_people"].includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

    // Prevent leading 0 or zero value
    if (name === "fair_no_of_people") {
      if (value === "0") return;

      const count = parseInt(value || 0);
      const peopleArray = Array.from({ length: count }, (_, index) => {
        return (
          participants.sub_data?.[index] || {
            fair_person_name: "",
            fair_person_image: null,
          }
        );
      });

      setParticipants((prev) => ({
        ...prev,
        fair_no_of_people: value,
        sub_data: peopleArray,
      }));
      return;
    }

    setParticipants((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePersonChange = (index, field, value) => {
    const updated = [...participants.sub_data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setParticipants((prev) => ({
      ...prev,
      sub_data: updated,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      createIdCardMutation.mutate(participants);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full p-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-orange-50/20">
          <div
            className="absolute inset-0 bg-[length:30px_30px] bg-[linear-gradient(to_right,#fef3c7_1px,transparent_1px),linear-gradient(to_bottom,#fef3c7_1px,transparent_1px)] "
            style={{
              opacity: 0.7,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            }}
          ></div>

          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-amber-500 animate-float"
              style={{
                left: `${star.x}%`,
                top: `${star.y}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity,
                filter: "blur(0.5px)",
                boxShadow: "0 0 4px #fff, 0 0 8px #fef3c7",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mb-6 flex justify-center">
        <img
          src="https://southindiagarmentsassociation.com/assets/images/events/gform.jpg"
          alt="Header"
          className="w-full max-w-2xl rounded-lg shadow-lg border-2 border-amber-200"
        />
      </div>

      <form onSubmit={onSubmit} noValidate>
        <Card className="mb-6 bg-white/95 backdrop-blur-sm border-amber-300 shadow-lg hover:shadow-amber-100/50 transition-shadow">
          <CardContent className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-amber-800">
                SIGA FAIR Registration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    Company Name<span className="text-red-600">*</span>
                  </label>
                  <Input
                    placeholder="Enter Company Name"
                    name="register_firm_name"
                    value={participants.register_firm_name}
                    onChange={handleInputChange}
                    className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                  />
                  {errors.register_firm_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.register_firm_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    GST Number<span className="text-red-600">*</span>
                  </label>
                  <Input
                    placeholder="Enter GST Number"
                    name="fair_gst_number"
                    value={participants.fair_gst_number}
                    onChange={handleInputChange}
                    maxLength={14}
                    className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                  />
                  {errors.fair_gst_number && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fair_gst_number}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    Places<span className="text-red-600">*</span>
                  </label>
                  <Input
                    placeholder="Enter Places"
                    name="register_address"
                    value={participants.register_address}
                    onChange={handleInputChange}
                    className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                  />
                  {errors.register_address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.register_address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    Type <span className="text-red-600">*</span>
                  </label>
                  <ReactSelect
                    isMulti
                    closeMenuOnSelect={false}
                    options={type}
                    value={
                      Array.isArray(participants.register_categygroup)
                        ? type.filter((opt) =>
                            participants.register_categygroup.includes(
                              opt.value
                            )
                          )
                        : typeof participants.register_categygroup === "string"
                        ? type.filter((opt) =>
                            participants.register_categygroup
                              .split(",")
                              .includes(opt.value)
                          )
                        : []
                    }
                    onChange={(selectedOptions) =>
                      setParticipants((prev) => ({
                        ...prev,
                        register_categygroup: selectedOptions
                          .map((opt) => opt.value)
                          .join(","),
                      }))
                    }
                    className="basic-multi-select text-sm ring-offset-background placeholder:text-muted-foreground"
                    classNamePrefix="select"
                    placeholder="Select Type..."
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderWidth: "0.1px",
                        cursor: "pointer",
                        borderColor: state.isFocused ? "#fcd34d" : "#fcd34d",
                        boxShadow: state.isFocused
                          ? "0 0 0 0.1px #fde68a"
                          : "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          borderColor: "#fcd34d",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#fde68a" : "white",
                        // borderRadius: "0.7rem",
                        textTransform: "captilize",
                        color: state.isFocused ? "#78350f" : "#111827",
                        "&:active": {
                          backgroundColor: "#fcd34d",
                          color: "#78350f",
                        },
                      }),
                      multiValueRemove: (base, state) => ({
                        ...base,
                        color: state.isFocused ? "#78350f" : "#6b7280",
                        backgroundColor: state.isFocused
                          ? "#fef3c7"
                          : "transparent",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        ":hover": {
                          color: "white",
                          backgroundColor: "#f59e0b",
                        },
                      }),
                    }}
                    components={{ DropdownIndicator }}
                  />
                  {errors.register_categygroup && selectedTypes.length == 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.register_categygroup}
                    </p>
                  )}
                </div>

                {showCategoryField && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-amber-800">
                      Profession<span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder="Enter Profession"
                      name="fair_profession"
                      value={participants.fair_profession}
                      onChange={handleInputChange}
                      className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                    />
                    {errors.fair_profession && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fair_profession}
                      </p>
                    )}
                  </div>
                )}
                {showCategoryField && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-amber-800">
                      Purpose
                    </label>
                    <Input
                      placeholder="Enter Purpose"
                      name="fair_note"
                      value={participants.fair_note}
                      onChange={handleInputChange}
                      className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <ReactSelect
                    isMulti
                    closeMenuOnSelect={false}
                    options={categorytype}
                    value={
                      Array.isArray(participants.register_incategygroup)
                        ? categorytype.filter((opt) =>
                            participants.register_incategygroup.includes(
                              opt.value
                            )
                          )
                        : typeof participants.register_incategygroup ===
                          "string"
                        ? categorytype.filter((opt) =>
                            participants.register_incategygroup
                              .split(",")
                              .includes(opt.value)
                          )
                        : []
                    }
                    onChange={(selectedOptions) =>
                      setParticipants((prev) => ({
                        ...prev,
                        register_incategygroup: selectedOptions
                          .map((opt) => opt.value)
                          .join(","),
                      }))
                    }
                    className="basic-multi-select text-sm ring-offset-background placeholder:text-muted-foreground"
                    classNamePrefix="select"
                    placeholder="Select Category..."
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderWidth: "0.1px",
                        cursor: "pointer",
                        borderColor: state.isFocused ? "#fcd34d" : "#fcd34d",
                        boxShadow: state.isFocused
                          ? "0 0 0 0.1px #fde68a"
                          : "none",
                        fontSize: "0.875rem",
                        "&:hover": {
                          borderColor: "#fcd34d",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#fde68a" : "white",
                        // borderRadius: "0.7rem",
                        textTransform: "captilize",
                        color: state.isFocused ? "#78350f" : "#111827",
                        "&:active": {
                          backgroundColor: "#fcd34d",
                          color: "#78350f",
                        },
                      }),
                      multiValueRemove: (base, state) => ({
                        ...base,
                        color: state.isFocused ? "#78350f" : "#6b7280",
                        backgroundColor: state.isFocused
                          ? "#fef3c7"
                          : "transparent",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        ":hover": {
                          color: "white",
                          backgroundColor: "#f59e0b",
                        },
                      }),
                    }}
                    components={{ DropdownIndicator }}
                  />
                  {errors.register_incategygroup &&
                    selectedCategory.length == 0 && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.register_incategygroup}
                      </p>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    Mobile No <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Mobile No"
                    name="register_phone"
                    value={participants.register_phone}
                    onChange={handleInputChange}
                    maxLength={10}
                    className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                  />
                  {errors.register_phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.register_phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    Email Id<span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter Email Id"
                    name="register_email"
                    value={participants.register_email}
                    onChange={handleInputChange}
                    className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                  />
                  {errors.register_email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.register_email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">
                    No of People<span className="text-red-600">*</span>
                  </label>
                  <Input
                    placeholder="Enter No of People"
                    name="fair_no_of_people"
                    value={participants.fair_no_of_people}
                    onChange={handleInputChange}
                    maxLength={2}
                    className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                  />
                  {errors.fair_no_of_people && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fair_no_of_people}
                    </p>
                  )}
                </div>
                {participants.sub_data?.length > 0 && (
                  <div className="col-span-full mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-amber-700">
                      People Details
                    </h3>
                    <div className="grid gap-4">
                      {participants.sub_data.map((person, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-amber-50 p-4 rounded-lg shadow-sm"
                        >
                          {/* Person Name */}
                          <div>
                            <label className="block text-sm font-medium text-amber-800 mb-1">
                              Person Name #{index + 1}
                            </label>
                            <Input
                              placeholder="Enter Person Name"
                              value={person.fair_person_name}
                              onChange={(e) =>
                                handlePersonChange(
                                  index,
                                  "fair_person_name",
                                  e.target.value
                                )
                              }
                              className="bg-white border-amber-300 focus:ring-amber-200 focus:border-amber-400"
                            />
                            {errors.sub_data?.[index]?.fair_person_name && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.sub_data[index].fair_person_name}
                              </p>
                            )}
                          </div>

                       
                          <div>
                            <label className="block text-sm font-medium text-amber-800 mb-1">
                              Upload Photo #{index + 1}
                            </label>

                            <ImageCropUpload
                              inputId={`fileCropInput-${index}`}
                              onCropDone={(file) =>
                                handlePersonChange(
                                  index,
                                  "fair_person_image",
                                  file
                                )
                              }
                         
                            />

                            {errors.sub_data?.[index]?.fair_person_image && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.sub_data[index].fair_person_image}
                              </p>
                            )}
                          </div>
                          <div>
                            {participants.sub_data?.[index]
                              ?.fair_person_image && (
                              <div className="mt-2">
                                <img
                                  src={URL.createObjectURL(
                                    participants.sub_data[index]
                                      .fair_person_image
                                  )}
                                  alt={`Person ${index + 1}`}
                                  className="w-30  h-30 object-cover border border-amber-300 shadow"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-md hover:shadow-amber-200/50 transition-all"
            disabled={createIdCardMutation.isPending}
          >
            {createIdCardMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-amber-800/70">
        <div className="text-xs text-amber-800/50">
          <a href="https://southindiagarmentsassociation.com/" target="_blank">
            Copyright © {new Date().getFullYear()} | South India Garments
            Association
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;
