<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div v-for="(item, index) in btn" :key="index">
        <v-text-field
          v-model="item.model"
          :label="item.label"
          :placeholder="item.placeholder"
          :persistent-placeholder="item.persistentPlaceholder"
          :hint="item.hint"
          :persistent-hint="item.persistentHint"
          :type="item.type"
          :disabled="item.disabled"
          :readonly="item.readonly"
          :counter="item.counter"
          :persistent-counter="item.persistentCounter"
          :clearable="item.clearable"
          :persistent-clear="item.persistentClear"
          :density="item.density"
          :variant="item.variant"
          :prefix="item.prefix"
          :suffix="item.suffix"
          :prepend-icon="item.prependIcon"
          :prepend-inner-icon="item.prependInnerIcon"
          :append-icon="item.appendIcon"
          :append-inner-icon="item.appendInnerIcon"
          :required="item.required"
          :rules="item.rules"
        >
        </v-text-field>
      </div>

      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      valid: true,

      btn: [
        {
          model: "",
          label: "Name",
          // PLACEHOLDER
          placeholder: "placeholder",
          persistentPlaceholder: false,
          // HINT :
          hint: "",
          persistentHint: false,
          // TYPE : https://www.w3schools.com/html/html_form_input_types.asp
          type: "text",
          //DISABLED
          disabled: false,
          readonly: false,
          // COUNTER : boolean | number | string
          counter: 10,
          persistentCounter: false,
          // CLEAR
          clearable: true,
          persistentClear: false,
          // DENSITY : default | comfortable | compact
          density: "default",
          // STYLE : regular | solo | filled | outlined | plain | underlined
          variant: "filled",
          // PRE/SUFFIX
          prefix: "",
          suffix: "",
          // ICON
          prependIcon: "",
          prependInnerIcon: "",
          appendIcon: "",
          appendInnerIcon: "",
          // REQUIRED
          required: true,
          // RULES : https://vuetify.cn/en/components/inputs/#rules
          rules: [
            (v) => !!v || "Name is required",
            (v) =>
              (v && v.length <= 10) || "Name must be less than 10 characters",
          ],
        },
        {
          model: "",
          label: "Email",
          // PLACEHOLDER
          placeholder: "placeholder",
          persistentPlaceholder: false,
          // HINT :
          hint: "",
          persistentHint: false,
          // TYPE : https://www.w3schools.com/html/html_form_input_types.asp
          type: "text",
          //DISABLED
          disabled: false,
          readonly: false,
          // COUNTER : boolean | number | string
          counter: false,
          persistentCounter: false,
          // CLEAR
          clearable: true,
          persistentClear: false,
          // DENSITY : default | comfortable | compact
          density: "default",
          // STYLE : regular | solo | filled | outlined | plain | underlined
          variant: "filled",
          // PRE/SUFFIX
          prefix: "",
          suffix: "",
          // ICON
          prependIcon: "",
          prependInnerIcon: "",
          appendIcon: "",
          appendInnerIcon: "",
          // REQUIRED
          required: true,
          // RULES : https://vuetify.cn/en/components/inputs/#rules
          rules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          ],
        },
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
