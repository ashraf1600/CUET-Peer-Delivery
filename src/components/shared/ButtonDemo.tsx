"use client";

import React from "react";
import CustomButton from "@/components/shared/CustomButton";
import {
  FiArrowRight,
  FiDownload,
  FiCheck,
  FiPlus,
  FiSearch,
  FiSend,
  FiRefreshCw,
} from "react-icons/fi";

/**
 * ButtonDemo Component
 *
 * Showing the various customization options of the enhanced CustomButton component.
 * Use this as a reference for implementing the CustomButton in your project. (If have any question, ask me [MD Ashraful Islam])
 */
const ButtonDemo = () => {
  // Demo state for loading buttons
  const [isLoading, setIsLoading] = React.useState(false);

  // Toggle loading state for demo
  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <section>
        <h2 className="mb-4 text-xl font-bold">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton variant="default">Default</CustomButton>
          <CustomButton variant="destructive">Destructive</CustomButton>
          <CustomButton variant="outline">Outline</CustomButton>
          <CustomButton variant="secondary">Secondary</CustomButton>
          <CustomButton variant="ghost">Ghost</CustomButton>
          <CustomButton variant="link">Link</CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <CustomButton size="sm">Small</CustomButton>
          <CustomButton size="default">Default</CustomButton>
          <CustomButton size="lg">Large</CustomButton>
          <CustomButton size="xl">Extra Large</CustomButton>
          <CustomButton size="2xl">2X Large</CustomButton>
          <CustomButton size="icon">
            <FiPlus />
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton leftIcon={<FiDownload />}>Download</CustomButton>
          <CustomButton rightIcon={<FiArrowRight />}>Next</CustomButton>
          <CustomButton leftIcon={<FiSearch />} rightIcon={<FiArrowRight />}>
            Search
          </CustomButton>
          <CustomButton variant="outline" leftIcon={<FiSend />}>
            Send
          </CustomButton>
          <CustomButton variant="secondary" rightIcon={<FiCheck />}>
            Complete
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Border Radius Options</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton radius="rounded-none">No Radius</CustomButton>
          <CustomButton radius="rounded-sm">Small Radius</CustomButton>
          <CustomButton radius="rounded-md">Medium Radius</CustomButton>
          <CustomButton radius="rounded-lg">Large Radius</CustomButton>
          <CustomButton radius="rounded-xl">Extra Large Radius</CustomButton>
          <CustomButton radius="rounded-full">Full Radius</CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Font Size Options</h2>
        <div className="flex flex-wrap items-center gap-4">
          <CustomButton fontSize="text-xs">Extra Small</CustomButton>
          <CustomButton fontSize="text-sm">Small</CustomButton>
          <CustomButton fontSize="text-base">Base</CustomButton>
          <CustomButton fontSize="text-lg">Large</CustomButton>
          <CustomButton fontSize="text-xl">Extra Large</CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Font Weight Options</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton fontWeight="font-normal">Normal</CustomButton>
          <CustomButton fontWeight="font-medium">Medium</CustomButton>
          <CustomButton fontWeight="font-semibold">Semibold</CustomButton>
          <CustomButton fontWeight="font-bold">Bold</CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Shadow Variations</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton shadow="shadow-none">No Shadow</CustomButton>
          <CustomButton shadow="shadow-sm">Small Shadow</CustomButton>
          <CustomButton shadow="shadow-md">Medium Shadow</CustomButton>
          <CustomButton shadow="shadow-lg">Large Shadow</CustomButton>
          <CustomButton shadow="shadow-xl">Extra Large Shadow</CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Scale Effects</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton scaleUp="hover:scale-105" scaleDown="active:scale-95">
            Scale Up & Down
          </CustomButton>
          <CustomButton scaleUp="hover:scale-110">Scale Up Only</CustomButton>
          <CustomButton scaleDown="active:scale-90">
            Scale Down Only
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Custom Styling</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton textColor="#8A2BE2">Custom Text Color</CustomButton>
          <CustomButton padding="px-8 py-3">Custom Padding</CustomButton>
          <CustomButton margin="m-2">Custom Margin</CustomButton>
          <CustomButton
            style={{
              background:
                "linear-gradient(to right, #6366f1, #8b5cf6, #d946ef)",
            }}
          >
            Custom Gradient
          </CustomButton>
        </div>
      </section>

      {/* Section for background color options */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Background Color Options</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton bgColor="#3B82F6">Blue Background</CustomButton>
          <CustomButton bgColor="#10B981" textColor="white">
            Green Background
          </CustomButton>
          <CustomButton bgColor="#F59E0B" textColor="#1F2937">
            Amber Background
          </CustomButton>
          <CustomButton bgColor="#6D28D9" textColor="white">
            Purple Background
          </CustomButton>
          <CustomButton bgColor="#EF4444" textColor="white">
            Red Background
          </CustomButton>
        </div>
      </section>

      {/* Section for hover effects */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Hover Effects</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton
            bgColor="#3B82F6"
            textColor="white"
            hoverBgColor="hover:bg-blue-700"
          >
            Hover Background
          </CustomButton>

          <CustomButton hoverTextColor="hover:text-red-500">
            Hover Text Color
          </CustomButton>

          <CustomButton
            variant="outline"
            borderColor="#3B82F6"
            hoverBorderColor="hover:border-blue-700"
            textColor="#3B82F6"
            hoverTextColor="hover:text-white"
            hoverBgColor="hover:bg-blue-600"
          >
            Hover Border & Text
          </CustomButton>

          <CustomButton hoverOpacity="hover:opacity-80">
            Hover Opacity
          </CustomButton>

          <CustomButton hoverUnderline>Hover Underline</CustomButton>
        </div>
      </section>

      {/* Section for cursor types */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Cursor Types</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton cursor="cursor-pointer">Pointer (Default)</CustomButton>
          <CustomButton cursor="cursor-not-allowed">Not Allowed</CustomButton>
          <CustomButton cursor="cursor-help">Help</CustomButton>
          <CustomButton cursor="cursor-wait">Wait</CustomButton>
          <CustomButton cursor="cursor-move">Move</CustomButton>
          <CustomButton cursor="cursor-text">Text</CustomButton>
        </div>
      </section>

      {/* Section for focus effects */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Focus Effects</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton focusRing="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Blue Focus Ring
          </CustomButton>
          <CustomButton focusRing="focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Green Focus Ring
          </CustomButton>
          <CustomButton focusRing="focus:ring-4 focus:ring-purple-500 focus:ring-offset-2">
            Purple Focus Ring
          </CustomButton>

          {/* Ring color examples with correct implementation */}
          <CustomButton
            ringColor="#F59E0B"
            focusRing="focus:ring-2 focus:ring-offset-2"
          >
            Amber Ring
          </CustomButton>
          <CustomButton
            ringColor="#EC4899"
            focusRing="focus:ring-2 focus:ring-offset-2"
          >
            Pink Ring
          </CustomButton>
          <CustomButton
            ringColor="#14B8A6"
            focusRing="focus:ring-2 focus:ring-offset-2"
          >
            Teal Ring
          </CustomButton>
        </div>
      </section>

      {/* Section for hover animations */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Hover Animations</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton hoverAnimation="hover:animate-pulse">
            Pulse Animation
          </CustomButton>
          <CustomButton hoverAnimation="hover:animate-bounce">
            Bounce Animation
          </CustomButton>
          <CustomButton
            leftIcon={<FiRefreshCw />}
            hoverAnimation="group hover:[&>span:first-child]:animate-spin"
            className="group"
          >
            Spin Icon
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Full Width</h2>
        <div className="space-y-4">
          <CustomButton isFullWidth>Full Width Button</CustomButton>
          <CustomButton isFullWidth variant="outline">
            Another Full Width
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Loading State</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton isLoading>Loading</CustomButton>
          <CustomButton isLoading loadingText="Processing...">
            Submit
          </CustomButton>
          <CustomButton
            onClick={handleLoadingClick}
            isLoading={isLoading}
            leftIcon={isLoading ? undefined : <FiRefreshCw />}
            loadingText="Loading..."
          >
            Click to Load
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Combined Features</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton
            variant="default"
            size="lg"
            radius="rounded-full"
            fontSize="text-base"
            fontWeight="font-bold"
            shadow="shadow-lg"
            scaleUp="hover:scale-105"
            scaleDown="active:scale-95"
            leftIcon={<FiDownload />}
          >
            Download Report
          </CustomButton>

          <CustomButton
            variant="outline"
            radius="rounded-lg"
            scaleUp="hover:scale-105"
            rightIcon={<FiSend />}
            style={{ borderWidth: "2px" }}
          >
            Send Message
          </CustomButton>

          {/* Complex button with multiple effects */}
          <CustomButton
            bgColor="#4F46E5"
            textColor="white"
            radius="rounded-full"
            padding="px-6 py-2"
            shadow="shadow-lg"
            hoverBgColor="hover:bg-indigo-700"
            hoverAnimation="hover:animate-pulse"
            scaleUp="hover:scale-105"
            transition="transition-all duration-300"
            focusRing="focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            leftIcon={<FiArrowRight />}
          >
            Interactive Button
          </CustomButton>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Disabled State</h2>
        <div className="flex flex-wrap gap-4">
          <CustomButton disabled>Disabled Button</CustomButton>
          <CustomButton disabled variant="destructive">
            Disabled Destructive
          </CustomButton>
          <CustomButton disabled variant="outline">
            Disabled Outline
          </CustomButton>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo;
