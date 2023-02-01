<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor"/>
    <slot></slot>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-2";
import MenuBar from "@/components/elements/menu-bar.vue";
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import "~/assets/styles/tiptap.scss"
export default {
  name: "tiptap-editor",
  components: {
    EditorContent,
    MenuBar,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Highlight,
        TaskList,
        TaskItem,
        ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },
  beforeUnmount() {
    this.editor.destroy()
    const html = this.editor.getHTML()
    console.log(html)
  },
};
</script>

<style scoped>

</style>
