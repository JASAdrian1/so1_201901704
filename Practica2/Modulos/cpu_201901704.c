#include <linux/module.h>
#include <linux/kernel.h>


#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>

/* libreria de memoria ram*/
#include <linux/hugetlb.h>

#include <linux/sched.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de cpu, practica 2");
MODULE_AUTHOR("Jose Adrian Aguilar Sanchez");


struct task_struct * cpu;
struct task_struct * child;
struct list_head * lstProcess;


static int escribir_archivo(struct seq_file *archivo, void *v){
    seq_printf(archivo,"data:{");
    for_each_process(cpu){
        seq_printf(archivo, "%d", cpu->pid);
        seq_printf(archivo, " --------> ");
        seq_printf(archivo, "%s", cpu->comm);
        seq_printf(archivo, " --------> ");
        seq_printf(archivo,"%d",cpu->__state);
        seq_printf(archivo, "\n");
        /*list_for_each(lstProcess, &(cpu->children)){
            child = list_entry(lstProcess, struct task_struct, sibling);
            seq_printf(archivo, "   ");
            seq_printf(archivo, "%d", child->pid);
            seq_printf(archivo, " --------> ");
            seq_printf(archivo, "%s", child->comm);
            seq_printf(archivo, "\n");
        }*/
    }
    seq_printf(archivo,"}");
    return 0;
}

//Informacion que se muestra al mostrar archivo con cat
static int al_abrir(struct inode *inode, struct file *file){
    return single_open(file,escribir_archivo,NULL);
}

static struct proc_ops operaciones = {
    .proc_open = al_abrir,
    .proc_read = seq_read
};


static int _insert(void){
    proc_create("cpu_201901704",0,NULL,&operaciones);
    printk(KERN_INFO "Se inserto el modulo CPU\n");
    return 0;
}

static void _remove(void){
    remove_proc_entry("cpu_201901704", NULL);
    printk(KERN_INFO "Se removio el modulo CPU\n");

}

module_init(_insert);
module_exit(_remove);
