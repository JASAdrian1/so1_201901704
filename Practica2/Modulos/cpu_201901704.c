#include <linux/module.h>
#include <linux/kernel.h>


#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>

/* libreria de memoria ram*/
#include <linux/hugetlb.h>

#include <linux/sched.h>
#include <linux/cred.h>
#include <linux/sched/signal.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de cpu, practica 2");
MODULE_AUTHOR("Jose Adrian Aguilar Sanchez");


struct task_struct * cpu;
struct task_struct * child;
struct list_head * lstProcess;


static int escribir_archivo(struct seq_file *archivo, void *v){
    //Devolviendo los valores como json
    seq_printf(archivo,"{\"data\":[");
    for_each_process(cpu){
        seq_printf(archivo,"\n{\n");
        seq_printf(archivo,"    \"pid\": \"%d\",\n",cpu->pid);
        seq_printf(archivo,"    \"nombre\": \"%s\",\n",cpu->comm);
        seq_printf(archivo,"    \"estado\": \"%d\",\n",cpu->__state);
        seq_printf(archivo,"    \"uid\": \"%d\",\n",cpu->cred->uid);
        seq_printf(archivo,"    \"child\": [\n");
        list_for_each(lstProcess, &(cpu->children)){
            child = list_entry(lstProcess, struct task_struct, sibling);
            seq_printf(archivo,"        {\n");
            seq_printf(archivo,"            \"pid\": \"%d\",\n",child->pid);
            seq_printf(archivo,"            \"nombre\": \"%s\"\n",child->comm);
            seq_printf(archivo,"        },");
        }
        seq_printf(archivo,"]\n");
        seq_printf(archivo,"},");
    }
    seq_printf(archivo,"]}\n");
    

    /*for_each_process(cpu){
        seq_printf(archivo, "%d", cpu->pid);
        seq_printf(archivo, " --------> ");
        seq_printf(archivo, "%s", cpu->comm);
        seq_printf(archivo, " --------> ");
        seq_printf(archivo,"%d",cpu->__state);
        seq_printf(archivo, "\n");
    */
        /*list_for_each(lstProcess, &(cpu->children)){
            child = list_entry(lstProcess, struct task_struct, sibling);
            seq_printf(archivo, "   ");
            seq_printf(archivo, "%d", child->pid);
            seq_printf(archivo, " --------> ");
            seq_printf(archivo, "%s", child->comm);
            seq_printf(archivo, "\n");
        }*/
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
    printk(KERN_INFO "Jose Adrian Aguilar Sanchez\n");
    return 0;
}

static void _remove(void){
    remove_proc_entry("cpu_201901704", NULL);
    printk(KERN_INFO "Primer Semestre 2023\n");

}

module_init(_insert);
module_exit(_remove);
