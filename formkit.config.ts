import { defineFormKitConfig } from "@formkit/vue"
import { en } from "@formkit/i18n"

export default defineFormKitConfig({
  locales: {
    en: {
      ...en,
      validation: {
        required: () => "required.",
        name: () => "Must be a valid name.",
        email: () => "Must be a valid email.",
        phone: () => "Must be a valid phone.",
        matches: (node: { name: string }) => {
          switch (node.name) {
            case "phone":
              return "Must be a valid phone."
            case "acceptTerms":
              return "Must accept the terms and conditions."
            default:
              return "Invalid type."
          }
        },
        accepted: () => "This field must be checked.",
      },
    },
  },

  locale: "en",
})
